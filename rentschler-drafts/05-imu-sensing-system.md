# IMU Sensing System

*Fall-Prevention Exoskeleton Program (sub-project) · Rowan University · Fall 2025 – Spring 2026 · PI: Dr. Mitja Trkov*

**Tags:** BNO085 · Teensy 4.1 · RS-485 · UART · I2C · SLIP Framing · KiCad · Sensor Fusion · EMI Hardening · Raspberry Pi 4

**Highlight metrics:** 8 body-segment IMUs · 400 Hz zero-packet-loss sampling · 55x latency cut (I2C → UART) · 2 full redesign cycles

*Part of the [Fall-Prevention Exoskeleton](04-exoskeleton.md) program.*

---

## Overview & Objective

A fall-prevention exoskeleton is only as good as its ability to sense a fall-risk motion before it becomes a fall. That means reading orientation from 8 points on the body (both thighs, both calves, both ankles, and upper/lower back) fast and reliably enough to eventually drive a real-time control loop. The sensor itself was never the hard part; getting 8 of them talking over a shared bus, on a mobile platform, next to solenoids and motor drivers throwing off electrical noise, was.

I designed, built, and debugged this system twice: once as the original I2C-based array, and again as a ground-up RS-485 rebuild after the first version's real-world performance didn't match its spec sheet.

**Suggested image:** `Exoskeleton Research/IMU System V2/image11.jpg`: assembled IMU System V2 Mainboard on the workbench, Teensy 4.1 and six RS-485 breakout headers populated

## System Architecture & Technical Stack

The current (Generation 2) array is built around eight BNO085 IMUs, each running its Hillcrest SH-2 sensor-fusion engine locally and reporting orientation over a dedicated, point-to-point RS-485 link back to a Teensy 4.1 host: one link per body segment, not a shared multidrop bus. Each channel runs through its own SN65HVD1476D RS-485 transceiver (half-duplex, differential) with a CDSOT23-SM712 ESD protection diode, wired over shielded 22 AWG 3-conductor cable to a remote BNO085 breakout at the limb segment. On top of RS-485's electrical layer, the Teensy's UART drivers frame every packet with SLIP (Serial Line Internet Protocol) so 8 independent, continuously-streaming channels at 400 Hz can be resynchronized cleanly if a frame boundary is ever missed. The Teensy aggregates all 8 channels and hands the fused orientation stream to a Raspberry Pi 4 over USB serial; the board also breaks out a direct Pi header so the sensing stack can run standalone or hand off through the Pi.

This is a deliberate departure from the original topology: Generation 1 multiplexed all 8 sensors onto one shared I2C bus, so every read waited its turn. Generation 2 gives every sensor its own electrical path, so all 8 report in parallel.

**Suggested images:**
- V1 wiring diagram (from the engineering proposal): shared I2C bus through a multiplexer, sequential reads; `Exoskeleton Research/Rowan University Mail - Technical Proposal.../unnamed_002_x5Ef.png`
- V2 wiring diagram (from the engineering proposal): point-to-point RS-485 into a dedicated Teensy 4.1, parallel reads; `.../unnamed_003_x5Ef.png`
- `Exoskeleton Research/IMU System V2/image2.jpg`: mainboard and shielded RS-485 breakout chain
- `Exoskeleton Research/IMU System V2/image4.jpg`: individual IMU pod, direction-marked for calibration
- `Exoskeleton Research/IMU System V2/IMU System V2 Layout.png`: KiCad layout, Teensy 4.1 with RT/RC/RA/LA/LC/LT body-segment breakouts
- `Exoskeleton Research/IMU System V2/schematic-render.png`: full schematic, RS-485 point-to-point architecture

## Engineering Challenges & Iteration

**This is the core story of this document.**

The first-generation system used 8 BNO055 IMUs, one at each body segment, wired over RJ12 into a custom PCB (the "Body Position Device") which multiplexed all 8 sensors onto a single I2C bus read by a Raspberry Pi 4. A smaller satellite breakout carried the two back-mounted sensors onto the same bus.

It worked on the bench in isolation, but the deployed environment exposed three weaknesses at once: I2C has no noise immunity, and the bus ran close to solenoids, relays, and motor drivers throwing off EMI; I2C's cable-length ceiling meant every RJ12 jack needed a 100Ω series damping resistor just to keep signal reflections on the long leg-length cable runs from corrupting reads; and multiplexing 8 sensors onto one address meant every read was sequential, never simultaneous.

**Quantifying the failure:** The theoretical model for the I2C bus looked fine on paper: 306 bits per sensor at 100 Hz across 8 sensors on a 400 kHz bus penciled out to 2.34 ms of latency and 61% bus utilization, comfortably inside the 10 ms window a 100 Hz control loop needs. It didn't hold up on the bench. The gap traced to clock stretching: the BNO055 holds the clock line low for 1–3 ms while it runs its onboard sensor-fusion algorithm, a stall the naive bandwidth model doesn't account for at all. Measured against real clock stretching, one full 8-sensor frame took 18.34 ms (nearly double the available window), confirmed in bench testing before writing anything up.

| Metric | I2C, theoretical | I2C, measured | UART, standard speed |
|---|---|---|---|
| Bus logic | Sequential | Sequential + stalls | Parallel |
| Bus utilization | 61% | **183.4%** | **3.3%** |
| Total latency | 2.34 ms | **18.34 ms** | **0.33 ms** |
| Bandwidth capacity | 427 Hz | **54 Hz** | **19,607 Hz** |

The measured bus utilization of 183% says everything: the system was structurally incapable of hitting its 100 Hz target, not just running a little slow.

**Writing the case before touching a soldering iron:** Once the failure mode was quantified, I wrote a formal technical proposal to our faculty advisor, Dr. Mitja Trkov, recommending a move to a UART + RS-485 architecture built around the BNO085 IMU and a Teensy 4.1 acting as a dedicated intermediary between the sensors and the Raspberry Pi. RS-485's differential signaling rejects the EMI from nearby solenoids and power systems, its cable-length rating (100+ m) removes any concern for the runs down the leg, and point-to-point wiring to the Teensy eliminates the multiplexer entirely: all 8 sensors read in parallel instead of waiting in line.

| Feature | BNO055 (V1) | BNO085 (V2) | Advantage |
|---|---|---|---|
| Primary protocol | I2C | SPI / UART | Reliable transfer over long cable runs |
| Fusion engine | Bosch BSX Lite | Hillcrest SH-2 | Tuned for high-noise environments |
| Max output rate | 100 Hz | 400 Hz | Higher resolution for gait analysis |
| Latency | High, variable | Low, fixed | Essential for real-time detection |
| Simultaneity | Sequential (mux) | Parallel | All 8 sensors report at once |

The proposal costed out two implementation paths so the decision wasn't made blind: hand-wiring the new components onto an existing unpopulated board ($288, 10–18 days) versus a second PCB iteration ($318, 15–25 days, at the cost of a short JLCPCB turnaround). The PCB path was chosen for the tighter, more field-reliable result.

> "I propose moving to a UART + RS-485 architecture using BNO085 IMUs and a Teensy 4.1 as the intermediary. This allows parallel sampling, real time latency, and immunity to electromagnetic interference."
> From the technical proposal to Dr. Mitja Trkov, December 8, 2025

**Built & validated:** The IMU System V2 Mainboard was designed around the Teensy 4.1: eight RJ45 channels (six leg-segment breakouts on the main board plus two more on a satellite board for the back-mounted sensors), each with its own SN65HVD1476D RS-485 transceiver and CDSOT23-SM712 ESD protection diode, wired over shielded 22 AWG 3-conductor cable to a remote BNO085 breakout at the limb segment. The board also breaks out a direct header for a Raspberry Pi 4B, so the sensing stack can run standalone off the Teensy or hand off through the Pi.

The result matched the model from the proposal: a sustained 400 Hz sampling rate across all 8 sensors with zero packet loss, replacing the 54 Hz real-world ceiling of the original I2C system, an outcome traceable to a specific, measured cause rather than a general sense that "it should be better now."

**Suggested images:**
- `Exoskeleton Research/IMU System V1/IMU System V1 layout.png`: V1 "Body Position Device" board, KiCad layout
- `Exoskeleton Research/IMU System V1/IMU Tracking System.png`: V1 product render, BNO055 with dual RJ12 breakout jacks
- `Exoskeleton Research/IMU System V1/schematic-render.png`: V1 schematic, I2C multiplexer architecture
- `Exoskeleton Research/IMU System V2/image.jpg`: belt-mounted compute enclosure and IMU pod chain

**Not-yet-captured but planned visuals:** bar chart of bus utilization by protocol (61% theoretical / 183% measured / 3.3% UART); logic-analyzer capture of I2C clock-line stretching during a BNO055 fusion cycle; exploded assembly view of a single IMU pod enclosure.

## Quantitative Results & Validation

- I2C bus latency measured under real load, isolating BNO055 clock-stretching (not bandwidth) as the actual root cause of the 100 Hz shortfall
- Failure mode quantified and cross-checked against a rebuilt theoretical model before any hardware was ordered
- RS-485/UART frame integrity verified across the full 8-sensor chain at a sustained 400 Hz with zero packet loss
- EMI immunity confirmed with the sensor array running adjacent to the solenoid-driven pneumatic actuators that caused problems in V1
- **Net result: a measured 54 Hz real-world ceiling on Generation 1 replaced by a validated, sustained 400 Hz on Generation 2, a 55x latency reduction traced to one root cause, not a general hardware refresh**

**Not-yet-captured but planned visuals:** per-frame timing scatter / packet-interval histogram from the 400 Hz zero-packet-loss validation run; photo of the EMI immunity test setup.

## Reflection

The easy version of this story is "I2C was too slow, so I switched to UART." The real lesson was upstream of that: the original bandwidth model was correct on its own terms and still wrong, because it didn't account for a real device behavior (clock stretching) that only showed up under measurement. Trusting the bench data over the datasheet math is what actually found the bottleneck.

Writing that analysis up as a formal proposal (with a second, competing implementation model, real cost figures, and a schedule) before committing to a redesign meant the decision was made with numbers in hand, not a hunch. That proposal is the piece of this project worth pointing to first.

---
*Note for editing: RS-485 duplex mode is described as "half-duplex" based on the actual cited transceiver part number (SN65HVD1476D, a half-duplex RS-485 transceiver); this is inferred from the real part, not stated outright in the original source text, worth a quick check against the schematic if you want to state it with full confidence.*

number: "007"
category: "Engineering Clinic Research"
title: "IMU Sensing System"
subtitle: "Fall-Prevention Exoskeleton Program (sub-project) · Rowan University · Fall 2025 – Spring 2026 · PI: Dr. Mitja Trkov"

domainTags:
  - BNO085
  - Teensy 4.1
  - RS-485
  - UART
  - I2C
  - SLIP Framing
  - KiCad
  - EMI Hardening

summary: |
  A fall-prevention exoskeleton is only as good as its ability to sense a fall-risk motion before it becomes a fall. That means reading orientation from 8 points on the body — both thighs, both calves, both ankles, and upper/lower back — fast and reliably enough to eventually drive a real-time control loop. The sensor itself was never the hard part; getting 8 of them talking over a shared bus, on a mobile platform, next to solenoids and motor drivers throwing off electrical noise, was.

  I designed, built, and debugged this system twice: once as the original I2C-based array, and again as a ground-up RS-485 rebuild after the first version's real-world performance didn't match its spec sheet.

specs:
  - label: "IMU"
    value: "8x BNO085, Hillcrest SH-2 fusion engine"
  - label: "Host MCU"
    value: "Teensy 4.1"
  - label: "Link"
    value: "Point-to-point RS-485, SN65HVD1476D transceivers"
  - label: "Framing"
    value: "SLIP over UART"
  - label: "Max Rate"
    value: "400 Hz per channel"
  - label: "Host Handoff"
    value: "USB serial → Raspberry Pi 4"
  - label: "Cabling"
    value: "Shielded 22 AWG, 3-conductor"

gallery:
  - src: "Exoskeleton Research/IMU System V2/image11.jpg"
    caption: "Assembled IMU System V2 Mainboard on the workbench — Teensy 4.1 and six RS-485 breakout headers populated"
  - src: "Exoskeleton Research/Rowan University Mail - Technical Proposal for Second Iteration of IMU System_files/unnamed_002_x5Ef.png"
    caption: "V1 wiring diagram from the engineering proposal — shared I2C bus through a multiplexer, sequential reads"
    tall: true
  - src: "Exoskeleton Research/Rowan University Mail - Technical Proposal for Second Iteration of IMU System_files/unnamed_003_x5Ef.png"
    caption: "V2 wiring diagram from the engineering proposal — point-to-point RS-485 into a dedicated Teensy 4.1, parallel reads"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/image2.jpg"
    caption: "Mainboard and shielded RS-485 breakout chain"
  - src: "Exoskeleton Research/IMU System V2/image4.jpg"
    caption: "Individual IMU pod, direction-marked for calibration"
  - src: "Exoskeleton Research/IMU System V2/IMU System V2 Layout.png"
    caption: "KiCad layout — Teensy 4.1 with RT/RC/RA/LA/LC/LT body-segment breakouts"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/schematic-render.png"
    caption: "Full schematic, Generation 2 — point-to-point RS-485 architecture"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/IMG_1918-rotated.jpg"
    caption: "Generation 2 array worn, front view — RS-485 leads routed from the belt-mounted mainboard down to each leg-segment pod"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/IMG_1926-rotated.jpg"
    caption: "Generation 2 array worn, side view"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/IMG_1957.jpeg"
    caption: "Treadmill walking test with the Generation 2 array worn, in the Rowan biomechanics lab"
  - src: "Exoskeleton Research/IMU System V2/IMG_1946.jpeg"
    caption: "OptiTrack Motive:Body software reconstructing a lower-body skeleton in real time from reflective markers, used as ground truth alongside the IMU array during walking trials"
  - src: "Exoskeleton Research/IMU System V1/IMU System V1 layout.png"
    caption: "V1 'Body Position Device' board, KiCad layout"
    tall: true
  - src: "Exoskeleton Research/IMU System V1/IMU Tracking System.png"
    caption: "V1 product render — BNO055 with dual RJ12 breakout jacks"
    tall: true
  - src: "Exoskeleton Research/IMU System V1/schematic-render.png"
    caption: "V1 schematic — I2C multiplexer architecture"
    tall: true
  - src: "Exoskeleton Research/IMU System V1/IMG_1193-fixed.jpg"
    caption: "RJ12 breakout board, top-down — TCA9548A I2C multiplexer routing all 8 sensor channels onto the shared bus"
    tall: true
  - src: "Exoskeleton Research/IMU System V1/IMG_1416-fixed.jpg"
    caption: "Generation 1 array worn, rear three-quarter view — belt-mounted multiplexer box and leg-segment breakouts"
    tall: true
  - src: "Exoskeleton Research/IMU System V1/IMG_1418-fixed.jpg"
    caption: "Generation 1 array worn, side view"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/image-rotated.jpg"
    caption: "Belt-mounted compute enclosure and IMU pod chain"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/IMU System V3 p1.png"
    caption: "IMU System V2 mainboard, top-down PCB view"
    tall: true

challenges: |
  This is the core story of this document.

  #### The First-Generation Bottleneck

  The first-generation system used 8 BNO055 IMUs, one at each body segment, wired over RJ12 into a custom PCB — the "Body Position Device" — which multiplexed all 8 sensors onto a single I2C bus read by a Raspberry Pi 4. A smaller satellite breakout carried the two back-mounted sensors onto the same bus.

  It worked on the bench in isolation, but the deployed environment exposed three weaknesses at once: I2C has no noise immunity, and the bus ran close to solenoids, relays, and motor drivers throwing off EMI; I2C's cable-length ceiling meant every RJ12 jack needed a 100-ohm series damping resistor just to keep signal reflections on the long leg-length cable runs from corrupting reads; and multiplexing 8 sensors onto one address meant every read was sequential, never simultaneous.

  #### Quantifying the Failure

  The theoretical model for the I2C bus looked fine on paper: 306 bits per sensor at 100 Hz across 8 sensors on a 400 kHz bus penciled out to 2.34 ms of latency and 61% bus utilization — comfortably inside the 10 ms window a 100 Hz control loop needs. It didn't hold up on the bench. The gap traced to clock stretching: the BNO055 holds the clock line low for 1–3 ms while it runs its onboard sensor-fusion algorithm, a stall the naive bandwidth model doesn't account for at all. Measured against real clock stretching, one full 8-sensor frame took 18.34 ms — nearly double the available window — confirmed in bench testing before writing anything up.

  | Metric | I2C, theoretical | I2C, measured | UART, standard speed |
  |---|---|---|---|
  | Bus logic | Sequential | Sequential + stalls | Parallel |
  | Bus utilization | 61% | 183.4% | 3.3% |
  | Total latency | 2.34 ms | 18.34 ms | 0.33 ms |
  | Bandwidth capacity | 427 Hz | 54 Hz | 19,607 Hz |

  The measured bus utilization of 183% says everything — the system was structurally incapable of hitting its 100 Hz target, not just running a little slow.

  #### Writing the Case Before Touching a Soldering Iron

  Once the failure mode was quantified, I wrote a formal technical proposal to our faculty advisor, Dr. Mitja Trkov, recommending a move to a UART + RS-485 architecture built around the BNO085 IMU and a Teensy 4.1 acting as a dedicated intermediary between the sensors and the Raspberry Pi. RS-485's differential signaling rejects the EMI from nearby solenoids and power systems, its cable-length rating (100+ m) removes any concern for the runs down the leg, and point-to-point wiring to the Teensy eliminates the multiplexer entirely — all 8 sensors read in parallel instead of waiting in line.

  | | BNO055 (V1) | BNO085 (V2) |
  |---|---|---|
  | Primary protocol | I2C | SPI/UART (reliable transfer over long cable runs) |
  | Fusion engine | Bosch BSX Lite | Hillcrest SH-2 (tuned for high-noise environments) |
  | Max output rate | 100 Hz | 400 Hz (higher resolution for gait analysis) |
  | Latency | High/variable | Low/fixed (essential for real-time detection) |
  | Simultaneity | Sequential (mux) | Parallel (all 8 sensors report at once) |

  The proposal costed out two implementation paths: hand-wiring the new components onto an existing unpopulated board ($288, 10–18 days) versus a second PCB iteration ($318, 15–25 days, at the cost of a short JLCPCB turnaround). The PCB path was chosen for the tighter, more field-reliable result.

  > I propose moving to a UART + RS-485 architecture using BNO085 IMUs and a Teensy 4.1 as the intermediary. This allows parallel sampling, real time latency, and immunity to electromagnetic interference.
  >
  > — Proposal to Dr. Mitja Trkov, December 8, 2025

  #### Built & Validated

  The IMU System V2 Mainboard was designed around the Teensy 4.1: eight RJ45 channels — six leg-segment breakouts on the main board plus two more on a satellite board for the back-mounted sensors — each with its own SN65HVD1476D RS-485 transceiver and CDSOT23-SM712 ESD protection diode, wired over shielded 22 AWG 3-conductor cable to a remote BNO085 breakout at the limb segment. The board also breaks out a direct header for a Raspberry Pi 4B.

  The result matched the model from the proposal: a sustained 400 Hz sampling rate across all 8 sensors with zero packet loss, replacing the 54 Hz real-world ceiling of the original I2C system — an outcome traceable to a specific, measured cause rather than a general sense that "it should be better now."

results:
  narrative: |
    I2C bus latency was measured under real load, isolating BNO055 clock-stretching — not bandwidth — as the actual root cause of the 100 Hz shortfall. That failure mode was quantified and cross-checked against a rebuilt theoretical model before any hardware was ordered for the redesign. On the rebuilt system, RS-485/UART frame integrity was verified across the full 8-sensor chain at a sustained 400 Hz with zero packet loss, with EMI immunity confirmed while the sensor array ran adjacent to the same solenoid-driven pneumatic actuators that caused problems in V1.

    Net result: a measured 54 Hz real-world ceiling on Generation 1 was replaced by a validated, sustained 400 Hz on Generation 2 — a 55x latency reduction traced to one root cause, not a general hardware refresh.
  metrics:
    - value: "400 Hz"
      label: "Sustained, Zero Packet Loss"
    - value: "55x"
      label: "Latency Reduction vs Gen 1"
    - value: "8"
      label: "Body-Segment IMUs"
    - value: "54 Hz"
      label: "Gen 1 Real-World Ceiling"

nav:
  prev:
    slug: "exoskeleton"
    title: "Fall-Prevention Exoskeleton"
  next:
    slug: "test-rig-instrumentation"
    title: "Test Rig, Instrumentation & Human Trials"

# Berta Medical — Wearable ECG Platform

*Co-Founder & Hardware Lead · Rowan University · 2024*

**Tags:** AD8232 · KiCad · ESP32 · SMD Assembly · Electrode Interface · Li-Ion Power · TP4056 · MAX1704x · MQTT (TLS) · C++

**Highlight metrics:** 3 PCB revisions · 3-lead RA/LA/LL electrode config · mV-range biopotential signal · TLS-encrypted MQTT telemetry

---

## Overview & Objective

A chest-worn ECG monitor built around a micro-voltage analog front-end and a custom SMD PCB stack, engineered for continuous biopotential acquisition and encrypted remote transmission of cardiac data. Owned the full hardware stack — electrode interface, analog signal conditioning, embedded firmware, and power management — through three PCB revisions from off-the-shelf modules to an integrated wearable.

## System Architecture & Technical Stack

The system is built around a single-lead-derived, 3-electrode ECG signal chain feeding a general-purpose microcontroller for local processing and wireless uplink:

- **Analog front-end** — AD8232 single-lead ECG instrumentation amplifier with integrated right-leg-drive reference and lead-off detection, interfaced to RA/LA/LL snap electrodes
- **Compute** — ESP32-C3 (dev kit) and ESP32-C6 (final wearable) for real-time sampling, on-device filtering, and WiFi uplink
- **Power management** — TP4056 Li-ion charge controller on every revision; MAX1704x fuel gauge added on the final wearable for accurate state-of-charge reporting over I2C
- **Peripheral interfaces** — I2C for the OLED debug display and fuel gauge; SPI for microSD data logging on the dev kit; daughterboard connector routing TP1–TP9 test points to the electrode interface on the final wearable
- **Network layer** — TLS-encrypted MQTT from the ESP32 to AWS IoT Core for device authentication and data ingestion (downstream of the acquisition hardware, not the focus of the hardware effort)
- **Fabrication** — schematic-captured and laid out in KiCad across three physical revisions — prototype, Dev Kit ("Berta Board 1.0"), and final wearable — hand-assembled in-house with full SMD assembly and no through-hole components in the signal path on the final board

**PCB revision comparison:**

| Revision | Compute | Analog Front-End | Power | Assembly |
|---|---|---|---|---|
| Prototype | Off-the-shelf dev board | AD8232 breakout module | Off-the-shelf | Chest-mount / clip-on enclosure |
| Dev Kit | ESP32-C3-DevKitC-02 | AD8232 breakout module | TP4056 + 18650 holder | Header breakout, OLED + microSD debug |
| Final Wearable | ESP32-C6 | AD8232, SMD, electrode snap connectors | TP4056 + MAX1704x fuel gauge | Full SMD, two-board stack, TP1–TP9 test points |

**Suggested images (in `Berta Medical/images/`):**
- `bertamedical-fig2-wearable-schematic.png` — final wearable schematic: AD8232 front-end, ESP32-C6, MAX1704x fuel gauge, TP1–TP9 test points via daughterboard connector
- `bertamedical-pcb-copper-routing.jpg` — ECG MainBoard MK1 copper routing: analog front-end and power sections laid out on opposite ends of the board

## Engineering Challenges & Iteration

Biopotential acquisition at the wearable's target signal amplitude (millivolt-range cardiac electrical activity) is inherently sensitive to motion artifact and mains interference, so the AD8232's integrated instrumentation amplifier and right-leg-drive reference were used from the earliest prototype onward rather than a discrete op-amp signal chain — reducing the surface area for noise coupling before the signal reaches the microcontroller's ADC. Electrode-skin contact reliability was treated as a first-class design constraint: both the clip-on and chest-mount prototype variants were built to validate lead placement and adhesion strategy before any PCB was committed to, and the final wearable's daughterboard connector was specifically added to physically separate the electrode interface from the mainboard so lead routing and contact points could be iterated and validated independently at dedicated test points (TP1–TP9) without re-spinning the compute and power sections.

The three-revision progression — prototype, Dev Kit, final wearable — was driven by the need to de-risk firmware and communications work separately from the mechanical and power constraints of a body-worn device. The Dev Kit intentionally kept the ESP32, OLED debug display, and microSD logging on a larger, breadboard-friendly board so WiFi reconnection logic and MQTT message queuing could be debugged with full visibility before committing to a compact form factor. Moving to the final wearable meant shrinking that same validated signal chain onto a two-board SMD stack, replacing the 18650 holder and basic charge circuit with a TP4056 charger paired with a MAX1704x fuel gauge for real state-of-charge reporting, and eliminating through-hole components from the signal path to keep the electrode-to-ADC trace length and parasitic loading minimal.

Hardware validation on the intermediate Dev Kit stage — not just the final board — proved necessary: issues in WiFi reconnection and MQTT message queuing were caught and resolved while the board still had an OLED and microSD slot for debug visibility, before being ported to the compact wearable where that visibility was no longer available.

**Suggested images:**
- `bertamedical-fig1-prototype-cutaway.jpg` — Phase 1 prototype, internal cutaway: electrode ring and off-the-shelf PCB validated before custom board design
- `bertamedical-fig3-devkit-assembly.jpg` — Dev Kit boards during in-house assembly, alongside the Phase 1 prototype enclosure

## Quantitative Results & Validation

AD8232 output was confirmed on both the prototype and final wearable PCB with an oscilloscope, with a clean QRS complex visible in the captured waveform, and independently verified via a live serial-plotter capture streamed over a COM port connection. Electrode contact quality and signal stability were checked on both boards, MAX1704x fuel gauge readings were verified against known battery state, and TP4056 charge current and cutoff behavior were confirmed under bench load. On the communications side, the Dev Kit PCB validated the full MQTT path to AWS IoT Core over WiFi, including TLS handshake and certificate authentication, before that firmware was ported to the final wearable.

The complete system — wearable hardware, cloud ingestion pipeline, and doctor/patient web portals — was live-demonstrated end to end at the Rowan New Venture Competition to an interdisciplinary panel of physicists, engineers, and business judges. **This was a student prototype validated at the bench and demo level, not a clinically validated device — no accuracy, sensitivity, or regulatory claims were established at this stage.**

**Suggested images:**
- `bertamedical-fig7-ecg-waveform.png` — oscilloscope-captured ECG waveform from the AD8232 front-end, repeatable QRS complex confirming signal-chain integrity
- `Berta Medical/quality images/graph(1).png` — live serial-plotter capture of AD8232 output over a live COM port connection, cross-checking the oscilloscope measurement
- `bertamedical-fig7-final-wearable-assembled.jpg` — final wearable, fully assembled with electrode leads — configuration used for bench validation and the Rowan New Venture Competition demo

---
*Note for editing: no additional hard specs (sampling rate, ADC resolution, gain values) were found in the source PDF beyond what's above — none were fabricated. "Wheatstone bridge"-style framing wasn't used here since it doesn't apply to ECG; flag if you want any AD8232 filter/CMRR specifics added — I'd need the actual datasheet config to state those accurately.*

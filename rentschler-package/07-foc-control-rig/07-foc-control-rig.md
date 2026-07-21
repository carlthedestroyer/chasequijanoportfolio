# Field Oriented Control (FOC) Test Bench

*Personal Project · Rowan University*

**Tags:** Field Oriented Control · ODrive S1 · BLDC · STM32 · Magnetic Encoder

**Highlight metrics:** ODrive S1 all-in-one motor controller · Eagle Power 3018 brushless motor · STM32 reserved for automation

---

## Overview & Objective

Engineered a Field Oriented Control motor test bench pairing an Eagle Power 3018 brushless DC motor with an ODrive S1 all-in-one motor controller, built as a hands-on testbed for characterizing closed-loop torque and velocity control on a BLDC/PMSM drive. An onboard STM32 development board is integrated but deliberately held in reserve for a second phase of host-free, closed-loop embedded automation.

## System Architecture & Technical Stack

The test bench integrates a brushless drive, an all-in-one motor controller, and a secondary microcontroller reserved for future closed-loop automation, with the d-q axis transform as the underlying control-theory core.

- **Eagle Power 3018 brushless DC motor** — selected for torque and speed headroom above comparable hobby-class BLDC motors, sized with future robotic actuator loads in mind
- **ODrive S1 motor controller** — all-in-one board with a built-in magnetic encoder for motor angle feedback, an onboard microcontroller running the FOC current loop, and a USB host link for live configuration and telemetry
- **STM32 development board** — physically integrated into the stack but not yet in the control loop; reserved for a second phase of closed-loop automation issuing commands directly, without a host computer mediating them
- **d-q axis (Field Oriented Control) transform** — the control-theory core: three-phase stator currents are transformed into a two-axis rotating reference frame so torque-producing and flux-producing current components can be regulated independently, the same principle underlying commercial variable-frequency drives

**Suggested images (in `FOC Control Rig/Images/` — note capital "I"):**
- `foc-rig-cad-render.png` — full test bench assembly, CAD render: motor/arm, ODrive S1 mid-stack, STM32 at base
- `foc-motor-arm.jpg` — Eagle Power 3018 BLDC motor and arm, the mechanical load driven by the FOC current loop
- `foc-odrive-mount.jpg` — ODrive S1 controller, mid-stack mount, battery and phase-lead connections
- `foc-stm32-mount.jpg` — STM32 dev board, base mount — wired in but not yet in the control loop

## Engineering Challenges & Iteration

The choice of the ODrive S1 over bringing up a custom gate-driver and current-sense firmware stack was deliberate: an integrated controller with a factory-calibrated FOC current loop and built-in magnetic encoder isolates the goal of this project — learning and validating the d-q axis control theory hands-on — from the separate, substantial risk of debugging low-level motor-drive firmware (PWM generation, current sensing, encoder calibration) from scratch. That separation let tuning and control-mode changes be iterated quickly through ODrive's open-source configuration tooling, with the effect visible immediately in live telemetry rather than gated behind driver bring-up.

The STM32 development board is integrated into the mechanical and electrical stack now but deliberately held out of the active control loop. It is reserved for a second phase: closed-loop position or velocity commands issued directly from the STM32's own firmware, without the ODrive web GUI or a host computer in the loop. Sequencing the work this way keeps the current build focused on validating FOC behavior on a known-good controller before adding the complexity of custom embedded control logic on top of it.

*(Note: this is a staged de-risking story, not a failure-recovery story — the original build didn't hit a dramatic hardware failure, and nothing above should be read as one.)*

**Suggested image:** `foc-odrive-s1-board.png` — ODrive S1 board reference photo, integrated encoder interface/current sensing/FOC firmware, the basis for choosing it over a custom driver stack

## Quantitative Results & Validation

Commanded a live position move through the ODrive web GUI and captured synced telemetry as direct evidence of closed-loop operation: the arm's physical response alongside the GUI's position, velocity, and phase-current traces for that same move, updating in real time. **Torque-versus-speed characterization of the Eagle Power 3018 under sustained load has not yet been run and remains planned future work, not a reported result.**

**Suggested images:**
- `foc-motor-test.gif` — motor and arm executing a live commanded position move
- `foc-odrive-gui.gif` — ODrive web GUI, synced position/velocity/current telemetry for the same move
- `foc-realtime-demonstration.png` — static capture: position, velocity, and phase-current traces overlaid for one commanded move

---
*Note for editing: image folder casing matters here — the real files are under `FOC Control Rig/Images/` with a capital "I" (confirmed via git). If you reference this folder elsewhere with lowercase "images/", fix it before deploying to a case-sensitive host.*

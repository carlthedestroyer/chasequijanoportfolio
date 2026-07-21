number: "011"
category: "Controls"
title: "Field Oriented Control Test Bench"
subtitle: "Personal Project · Rowan University"

domainTags:
  - Field Oriented Control
  - ODrive S1
  - BLDC
  - STM32
  - Magnetic Encoder

summary: |
  Engineered a Field Oriented Control motor test bench pairing an Eagle Power 3018 brushless DC motor with an ODrive S1 all-in-one motor controller, built as a hands-on testbed for characterizing closed-loop torque and velocity control on a BLDC/PMSM drive.

  An onboard STM32 development board is integrated but deliberately held in reserve for a second phase of host-free, closed-loop embedded automation.

specs:
  - label: "Motor"
    value: "Eagle Power 3018 BLDC"
  - label: "Controller"
    value: "ODrive S1, factory-calibrated FOC current loop"
  - label: "Position Feedback"
    value: "Built-in magnetic encoder"
  - label: "Secondary MCU"
    value: "STM32 dev board (integrated, reserved for phase 2)"
  - label: "Control Theory"
    value: "d-q axis (Field Oriented Control) transform"
  - label: "Interface"
    value: "USB host link, ODrive web GUI"

gallery:
  - src: "FOC Control Rig/Images/foc-rig-cad-render.png"
    caption: "Full test bench assembly, CAD render — motor/arm, ODrive S1 mid-stack, STM32 at base"
    tall: true
  - src: "FOC Control Rig/Images/foc-motor-arm.jpg"
    caption: "Eagle Power 3018 BLDC motor and arm — the mechanical load driven by the FOC current loop"
  - src: "FOC Control Rig/Images/foc-odrive-mount.jpg"
    caption: "ODrive S1 controller, mid-stack mount — battery and phase-lead connections"
  - src: "FOC Control Rig/Images/foc-stm32-mount.jpg"
    caption: "STM32 dev board, base mount — wired in but not yet in the control loop"
  - src: "FOC Control Rig/Images/foc-odrive-s1-board.png"
    caption: "ODrive S1 board reference photo — integrated encoder interface, current sensing, and FOC firmware"
  - src: "FOC Control Rig/Images/foc-motor-test.gif"
    caption: "Motor and arm executing a live commanded position move"
  - src: "FOC Control Rig/Images/foc-odrive-gui.gif"
    caption: "ODrive web GUI, synced position/velocity/current telemetry for the same move"
  - src: "FOC Control Rig/Images/foc-realtime-demonstration.png"
    caption: "Position, velocity, and phase-current traces overlaid for one commanded move"
    tall: true

challenges: |
  The choice of the ODrive S1 over bringing up a custom gate-driver and current-sense firmware stack was deliberate: an integrated controller with a factory-calibrated FOC current loop and built-in magnetic encoder isolates the goal of this project — learning and validating the d-q axis control theory hands-on — from the separate, substantial risk of debugging low-level motor-drive firmware (PWM generation, current sensing, encoder calibration) from scratch. That separation let tuning and control-mode changes be iterated quickly through ODrive's open-source configuration tooling, with the effect visible immediately in live telemetry rather than gated behind driver bring-up.

  The STM32 development board is integrated into the mechanical and electrical stack now but deliberately held out of the active control loop. It is reserved for a second phase: closed-loop position or velocity commands issued directly from the STM32's own firmware, without the ODrive web GUI or a host computer in the loop. Sequencing the work this way — validating FOC behavior on a known-good controller before adding the complexity of custom embedded control logic on top of it — is a staged de-risking strategy, not a response to a hardware failure.

results:
  narrative: |
    Commanded a live position move through the ODrive web GUI and captured synced telemetry as direct evidence of closed-loop operation: the arm's physical response alongside the GUI's position, velocity, and phase-current traces for that same move, updating in real time.

    Torque-versus-speed characterization of the Eagle Power 3018 under sustained load has not yet been run and remains planned future work, not a reported result.
  metrics:
    - value: "Live"
      label: "Closed-Loop Position Demo"
    - value: "3"
      label: "Synced Telemetry Channels (Pos/Vel/Current)"

nav:
  prev:
    slug: "balancing-robot"
    title: "Balancing Robot — Two Generations of Control System Design"
  next:
    slug: "subaru-internship"
    title: "Subaru Technical Training Internship"

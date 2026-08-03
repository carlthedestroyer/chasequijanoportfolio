number: "002"
category: "Engineering Clinic Research"
title: "Fall-Prevention Exoskeleton"
subtitle: "Undergraduate Student Researcher · Rowan University (PI: Dr. Mitja Trkov) · Jan 2024 – Present"

domainTags:
  - Teensy 4.1
  - BNO085
  - RS-485/UART
  - Raspberry Pi 4
  - Pneumatic Actuation
  - Bowden Cable
  - String Potentiometer
  - Load Cell

summary: |
  Falls are a leading cause of injury for the elderly and people with limited mobility. The Fall-Prevention Exoskeleton is a pneumatically actuated, wearable device that detects perturbations in the wearer's gait in real time and corrects them before a slip or fall occurs, an assistive layer of safety for those who struggle with walking, supporting confidence and independence. Over the most recent semester the team completed a major hip-to-knee chassis redesign, a ground-up rebuild of the sensing system and test bench, and an instrumented pneumatic bench-test campaign. My ownership covers the sensing, test-bench, force-characterization, and pneumatic-hardware subsystems.

  - Engineered a wearable 8-node motion-capture system: built over a full-duplex RS-485/UART transceiver matrix using shielded flexible cables to eliminate signal noise during human trials.
  - Routed custom Teensy-based mainboards: aggregated high-frequency BNO085 IMU data streams (quaternion, gyroscopic, and accelerometer data at up to 400Hz per node) to a central Raspberry Pi gateway for real-time predictive gait detection.
  - Executed exoskeleton bench testing: ran 192 total trials using string potentiometers, pressure transducers, and a single load cell across hip abduction and knee extension setups within a hardware-in-the-loop (HIL) pneumatic test matrix.
  - Researching NMES integration: currently in the research phase for a neuromuscular electrical stimulation system to assist in motor control, scoping the low-level electronics and multi-channel current-regulation architecture it will require.

specs:
  - label: "Sensing Chain"
    value: "8x BNO085 IMU (RS-485/UART) → Teensy-based mainboard → Raspberry Pi 4"
  - label: "Actuation Chain"
    value: "Gait-detection trigger → dedicated control board → pneumatic hip cylinders"
  - label: "Actuation"
    value: "Pneumatic, Bowden-cable driven — hip abduction and knee extension"
  - label: "Bench Testing"
    value: "192 total trials — string potentiometers, pressure transducers, single load cell (HIL matrix)"
  - label: "Current R&D"
    value: "NMES integration — scoping multi-channel current-regulation electronics"
  - label: "Program"
    value: "Rowan University, Jan 2024 – Present"

gallery:
  - src: "Exoskeleton Research/overleafportfoliopdf/images/worn_system.jpg"
    caption: "IMU System V2 worn for data acquisition: each sensor at its designated anatomical location on custom adjustable straps."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/torque_plot.jpg"
    caption: "Hip abduction load-cell results: supply pressure (PSI) against applied torque (N·m) across the 96-trial matrix."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/backpack_cad.jpg"
    caption: "CAD model progress on the exoskeleton backpack design: solenoids, custom relay and control boards, battery, and laser-cut paneling in one enclosure."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/control_v2_render.jpg"
    caption: "Control Board V2 render: primary and secondary microcontrollers, with temperature monitoring across multiple systems plus pressure and voltage monitoring serving as a safety function, and LED status indication."

challenges: |
  #### System Architecture: Independent Sensing and Actuation

  The platform splits into two chains that meet on a shared, instrumented bench: an 8-node RS-485/UART sensing array streaming to a Raspberry Pi for real-time gait-detection, and a pneumatic actuation chain — a dedicated control board driving the hip cylinders — that the Pi triggers when it flags a fall-risk motion. I own the sensing, test-bench, force-characterization, and pneumatic-hardware subsystems across this split architecture.

  The two subsystems developed in depth on this platform are documented separately: the [IMU Sensing System](imu-sensing-system.html) covers the ground-up rebuild of the wearable sensor array from a failing I2C bus to a validated 400Hz RS-485 architecture, and [Test Rig, Instrumentation & Human Trials](test-rig-instrumentation.html) covers the bench force-testing campaign, the modular pneumatic cylinder mechanism, and the current push toward human-subjects trials.

  #### What's Next: NMES Integration

  Beyond the current sensing/actuation loop, I'm in the research phase for integrating neuromuscular electrical stimulation (NMES) to actively assist motor control, scoping the low-level electronics and multi-channel current-regulation architecture that subsystem will require.

results:
  narrative: |
    Across the sensing, test-bench, and pneumatic-hardware subsystems, the rebuilt RS-485 sensing chain was confirmed running at a sustained 400Hz across all 8 body-segment sensors, and a hardware-in-the-loop pneumatic bench campaign logged 192 total trials across hip abduction and knee extension setups using string potentiometers, pressure transducers, and a load cell. Full detail and validation numbers for each subsystem live on their dedicated pages, linked above.
  metrics:
    - value: "192"
      label: "Total Bench Trials (Hip Abduction + Knee Extension)"
    - value: "8"
      label: "Wearable IMU Nodes"
    - value: "400 Hz"
      label: "Peak Per-Node IMU Rate"
    - value: "2024"
      label: "Program Start (Jan 2024 – Present)"
  table:
    headers: ["Subsystem", "Status"]
    rows:
      - ["Sensing (8-node IMU array)", "Rebuilt on RS-485 — see IMU Sensing System"]
      - ["Test bench + force testing", "192 total trials across hip abduction and knee extension — see Test Rig & Instrumentation"]
      - ["Pneumatic hardware (cylinder mechanism)", "Modular assembly, now on its second generation"]
      - ["NMES integration", "Early research and scoping phase"]

nav:
  prev:
    slug: "berta-medical"
    title: "Berta Medical - Wearable ECG Platform"
  next:
    slug: "imu-sensing-system"
    title: "IMU Sensing System"

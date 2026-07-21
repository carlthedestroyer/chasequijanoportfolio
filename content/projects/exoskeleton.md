number: "002"
category: "Engineering Clinic Research"
title: "Fall-Prevention Exoskeleton"
subtitle: "Undergraduate Engineering Clinic · Rowan University · Fall 2025 – Spring 2026 · PI: Dr. Mitja Trkov"

domainTags:
  - KiCad
  - Teensy 4.1
  - BNO085
  - RS-485
  - ESP32
  - Raspberry Pi 4
  - Pneumatic Actuation
  - FEA

summary: |
  A pneumatically-actuated, hip-level exoskeleton engineered to sense a fall-risk motion and deliver corrective assistive force to the hip joint before a fall occurs. Falls are a leading cause of injury for older adults and people with gait or balance impairments; this Engineering Clinic project set out to build a wearable, hip-level exoskeleton that senses a fall-risk motion in real time and pneumatically assists the hip joint, actuating abduction/adduction and flexion through Bowden-cable-driven pneumatic cylinders. The two-semester program spans mechanism design, embedded orientation sensing, custom control/relay electronics, and a structured bench force-testing campaign now advancing toward human-subjects trials.

  This work is conducted under PI Dr. Mitja Trkov as part of the Rowan University Engineering Clinic program, in collaboration with PhD student Vaibhav Vanshwarma, who is co-developing the human-subjects trial procedure. I own the electrical, embedded, and test-engineering side across both semesters, working alongside teammates leading the mechanical design.

specs:
  - label: "Sensing Chain"
    value: "8x BNO085 IMU (RS-485) → Teensy 4.1 → Raspberry Pi 4"
  - label: "Actuation Chain"
    value: "ESP32 Control Board → Relay Board V1 → AirTac solenoid valves → hip cylinders"
  - label: "Microcontrollers"
    value: "Teensy 4.1, ESP32-S3, Raspberry Pi 4"
  - label: "Actuation"
    value: "Pneumatic, Bowden-cable driven, 2 DOF (ab/adduction + flexion)"
  - label: "Power"
    value: "Switched 22.2V/5V rail architecture"
  - label: "Chassis"
    value: "Cuff-based brace, aluminum C-channels, FEA-validated"
  - label: "Communication"
    value: "RS-485/UART (SLIP), USB serial, I2C (Gen 1 bus)"

gallery:
  - src: "Exoskeleton Research/Exoskeleton Bench Testing/benchtest1.jpg"
    caption: "Hip brace and pneumatic actuator mounted to the force-testing rig, FUTEK load cell inline"
  - src: "Exoskeleton Research/Exoskeleton Bench Testing/benchtest3.jpg"
    caption: "Redesigned cuff-based thigh brace on the force-testing stand with FUTEK load cell"
  - src: "Exoskeleton Research/Control Board V2/Exoskeleton Control Board V3.png"
    caption: "Control Board V2 render — dual Teensy 4.1, with load cell, pressure transducer, and thermistor headers"
    tall: true
  - src: "Exoskeleton Research/Relay Board V1/RelayMainBoard1.png"
    caption: "Relay Board V1 — dedicated 12-channel, flyback-protected relay board render"
    tall: true
  - src: "Exoskeleton Research/IMU System V2/image11.jpg"
    caption: "Assembled IMU System V2 mainboard, showing Teensy 4.1 and RS-485 breakout headers"
  - src: "Exoskeleton Research/Exoskeleton Worn Biomechanics Lab tests/IMG_2115.jpg"
    caption: "IMU array and exoskeleton worn together in the Rowan biomechanics lab, tethered to an overhead safety trolley on a rail track — initial worn testing ahead of Fall 2026 human trials, OptiTrack motion-capture cameras visible on the walls"
  - src: "Exoskeleton Research/Exoskeleton Worn Biomechanics Lab tests/IMG_2153.jpg"
    caption: "Dynamic hip-flexion movement test with the full system worn and the safety tether attached overhead"

challenges: |
  #### Chassis Redesign — Cuff-and-C-Channel Brace, FEA-Validated
  The original thigh brace used a plastic jointed thigh link that couldn't transmit actuation force reliably — it flexed under load instead of driving the hip joint. In Spring 2026 the team replaced it with a cuff-based brace and a system of aluminum C-channels, verified against the redesign with FEA before fabrication. This resolved the force-transmission deficiencies that had limited every earlier iteration. The hip mechanism actuates two degrees of freedom, abduction/adduction and flexion, through Bowden-cable-linked pneumatic cylinders driven by the modular cylinder assembly and instrumentation covered in the Test Rig document.

  #### Split Architecture De-Risked a Ground-Up Sensing Rebuild
  The platform's split architecture — independent sensing and actuation chains meeting on a shared, instrumented bench — meant a hard failure in one subsystem never blocked the other. That separation is what let the sensing chain go through a ground-up rebuild in the middle of the project without touching the actuation side at all: the first-generation I2C-based IMU array silently missed its own 100 Hz timing budget by a wide margin under real load, a failure that was root-caused with bench measurements rather than assumed, formally proposed as a redesign, and rebuilt around RS-485 to hit a sustained 400 Hz with zero packet loss — full detail in the IMU Sensing System document.

  The mechanical and instrumentation sides iterated the same way. The chassis moved from a plastic thigh link that flexed under load to an FEA-validated cuff-and-C-channel brace. The bench electronics moved from loose solid-state relay modules to a dedicated 12-channel flyback-protected relay board, and from a dual-ESP32-S3 control board (Control Board V1) to a dual-Teensy-4.1 control board (Control Board V2) purpose-built for the structured hip-abduction protocol, adding string-potentiometer and load-cell channels the first board didn't carry. Both redesigns, and the two 96-trial force campaigns that validated them, are covered in the Test Rig & Instrumentation document.

results:
  narrative: |
    Across two Engineering Clinic semesters the program validated its sensing chain, chassis, and control electronics through direct bench measurement. The rebuilt RS-485 sensing chain was confirmed running at a sustained 400 Hz across all 8 body-segment sensors with zero packet loss, and its EMI immunity was verified with the array running adjacent to the same solenoid-driven pneumatic actuators that had corrupted the original I2C bus. Two structured 96-trial force campaigns — hip abduction and knee extension, each spanning six pressures and four actuation delays — were logged against a FUTEK inline load cell, and the redesigned chassis was FEA-validated before fabrication to resolve the original plastic thigh link's force-transmission failure. Six custom PCBs were designed and built across the program, spanning both control-electronics and IMU-sensing generations. Fall 2025 (Sarah Smith, Chase Quijano, Reuben Cuevas, Eric Carty) built the V1 mechanism and Gen-1 IMU array and identified the sampling-rate shortfall; Spring 2026 (Chase Quijano, Eric Carty, Preston Haddon), in collaboration with PhD student Vaibhav Vanshwarma on human-trials protocol development, executed the chassis redesign, the IMU System V2 rebuild, the test-rig instrumentation redesign, and the two 96-trial test campaigns.
  metrics:
    - value: "400 Hz"
      label: "IMU Sensing, Zero Packet Loss"
    - value: "2×96"
      label: "Trial Force Campaigns"
    - value: "6"
      label: "Custom PCBs Designed"
    - value: "2"
      label: "Clinic Semesters"

nav:
  prev:
    slug: "berta-medical"
    title: "Berta Medical - Wearable ECG Platform"
  next:
    slug: "imu-sensing-system"
    title: "IMU Sensing System"

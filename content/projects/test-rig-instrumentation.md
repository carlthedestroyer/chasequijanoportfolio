number: "008"
category: "Engineering Clinic Research"
title: "Test Rig, Instrumentation & Human Trials Program"
subtitle: "Fall-Prevention Exoskeleton Program (sub-project) · Rowan University · Fall 2025 – Spring 2026 · PI: Dr. Mitja Trkov"

domainTags:
  - Pneumatic Actuation
  - KiCad
  - ESP32-S3
  - Teensy 4.1
  - Load Cell
  - FUTEK
  - Design of Experiments
  - Fusion 360

summary: |
  Before an exoskeleton can be trusted on a person, the actuation it relies on has to be characterized on the bench: how much force does a given pneumatic pressure actually produce at the hip joint, how does that force respond to actuation delay, and does the mechanism survive repeated cycling without drifting out of calibration. Answering that meant building a fixture that could hold the hip brace under controlled load, instrumenting it well enough to trust the numbers, and running enough trials to see a real trend instead of noise.

  I own this piece of the project end to end: designed the mechanical fixture and the modular cylinder assembly, built the electronics and instrumentation, and ran every load-cell test in the campaign.

specs:
  - label: "Cylinder Assembly"
    value: "Modular, Fusion 360, quick-swap mount, Rev 2"
  - label: "Control Board V1"
    value: "Dual ESP32-S3, 6 pressure inputs, current/temp sensing"
  - label: "Control Board V2"
    value: "Dual Teensy 4.1, load cell + string-pot channels"
  - label: "Relay Board"
    value: "12-channel, flyback-protected"
  - label: "Load Cell"
    value: "FUTEK inline, HX711 amplifier"
  - label: "Test Matrix"
    value: "6 pressures × 4 actuation delays"
  - label: "Fabrication"
    value: "KiCad, 3D-printed fixtures, TMC optical test table"

gallery:
  - src: "Exoskeleton Research/Exoskeleton Bench Testing/benchtest3.jpg"
    caption: "Hip brace mounted on the force-testing stand with the FUTEK load cell inline"
  - src: "Exoskeleton Research/Exoskeleton Bench Testing/benchtest2.jpg"
    caption: "Hip mechanism and pneumatic cylinder mounted on the TMC optical test table"
  - src: "Exoskeleton Research/Control System + Test Bench/testbench2.jpg"
    caption: "Redesigned Spring 2026 test bench — hip mechanism, hardware emergency stop, pneumatic valves, gauges, and control electronics"
  - src: "Exoskeleton Research/Control Board V1/Exoskeleton Control Board.png"
    caption: "Control Board V1, full render — dual ESP32-S3 architecture with primary and safety/failsafe secondary microcontrollers"
    tall: true
  - src: "Exoskeleton Research/Control Board V1/schematic-render.png"
    caption: "Control Board V1 schematic — INA260 current sensing, DS18B20 temp sensing, PWM fan channels, 6 pressure-transducer inputs, 16-channel relay bus"
    tall: true
  - src: "Exoskeleton Research/Control Board V2/Exoskeleton Control Board V3.png"
    caption: "Control Board V2, full render — dual Teensy 4.1 redesign built for the structured hip-abduction protocol"
    tall: true
  - src: "Exoskeleton Research/Control Board V2/Exoskeleton Control Board V3 p2.png"
    caption: "Control Board V2 detail — HX711 load-cell input, PT5–PT7 pressure-transducer headers, and THERM thermistor channels"
  - src: "Exoskeleton Research/Control Board V2/schematic-render.png"
    caption: "Control Board V2 schematic — 7 pressure inputs, 6 string-potentiometer inputs, HX711 load-cell amp, dual WS2812 status indicators"
    tall: true
  - src: "Exoskeleton Research/Relay Board V1/RelayMainBoard1.png"
    caption: "Relay Board V1 — 12-channel, flyback-protected, replacing a handful of loose solid-state relay modules from the earlier bench build"
  - src: "Exoskeleton Research/Relay Board V1/schematic-render.png"
    caption: "Relay Board V1 schematic — one switched, flyback-protected channel per pneumatic solenoid valve, driven off the control board's output header"
    tall: true
  - src: "Exoskeleton Research/Exoskeleton Worn Biomechanics Lab tests/IMG_2143.jpg"
    caption: "Full harness and hip-brace fit check in the Rowan biomechanics lab — control electronics and IMU leads routed at the waist, ahead of the first harness-rig sessions"
  - src: "Exoskeleton Research/Exoskeleton Worn Biomechanics Lab tests/IMG_2148.jpg"
    caption: "Rear view of the worn hip brace and thigh cuffs, with the overhead safety-tether attachment point at the shoulders"

challenges: |
  The first version of the modular cylinder assembly proved the concept and immediately showed where it needed to improve; a second iteration has since tightened the mounting tolerances and cable routing based on what broke or drifted during the first round of trials. The instrumentation side iterated the same way: the original bench ran on a handful of loose solid-state relay modules, consolidated into Relay Board V1, a dedicated 12-channel flyback-protected board. Control Board V1's dual-ESP32-S3 architecture gave way to Control Board V2, built around dual Teensy 4.1s specifically for the structured hip-abduction protocol, adding the string-potentiometer and HX711 load-cell channels the first board never carried. The Spring 2026 bench rebuild shrank the physical footprint while adding what testing actually needed: a hardware emergency stop, switched power rails, and the pressure transducer integrated directly into Control Board V2.

  With the rig and instrumentation in place, a structured test matrix was defined and run spanning six pressures and four actuation delays — 96 trials total — logging force via the inline FUTEK load cell against pressure and actuation timing for every trial of the hip-abduction campaign. The rig was then reconfigured and a second, parallel 96-trial campaign was run characterizing knee extension using the same load-cell instrumentation and test structure, giving the team force data across both actuated joints. Every trial's data was checked and validated as viable for downstream force-vs-pressure trend analysis, which is the next step now in progress.

  #### Toward Human Trials
  The bench campaign answers what the actuator can do in isolation; the next phase is characterizing it on a person. I'm working alongside PhD student Vaibhav Vanshwarma to develop the test procedure for human trials — what a session looks like, what gets measured, and what the safety and consent process needs to cover — with early sessions on a harness rig to work out how subjects wear the system and where the test protocol still has gaps. In parallel, I'm developing a custom backpack enclosure to package the compute and IMU hub (Raspberry Pi 4, Teensy 4.1, and the IMU System V2 mainboard) into a single wearable unit, rather than the bench-tethered setup used for pneumatic force testing.

results:
  narrative: |
    Two structured, independent 96-trial campaigns have been completed — hip abduction and knee extension — each spanning a 6x4 test matrix of six pressures and four actuation delays. Force was measured on every trial via an inline FUTEK load cell, read through an HX711 amplifier on Control Board V2, against commanded pressure and actuation timing. Every trial's data was checked and validated as viable for downstream force-vs-pressure trend analysis, now in progress.

    The instrumentation stack across Control Board V1/V2 and Relay Board V1 spans current sensing, temperature sensing, pressure transduction, cylinder-position string-potentiometers, and load-cell force measurement, all logged from a common board during a trial. Safety protocol held constant across every trial run to date: informed consent from any participant beyond the design team, PPE and clear danger-zone awareness near actuated hardware, and a hardware emergency stop within reach at all times.
  metrics:
    - value: "2×96"
      label: "Trial Force Campaigns"
    - value: "6×4"
      label: "Pressure × Delay Test Matrix"
    - value: "3"
      label: "Custom PCBs on the Rig"
    - value: "Fall 2026"
      label: "Human-Trials Target"

nav:
  prev:
    slug: "imu-sensing-system"
    title: "IMU Sensing System"
  next:
    slug: "digital-scale"
    title: "Custom Digital Scale"

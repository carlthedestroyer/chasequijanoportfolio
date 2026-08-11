# Test Rig, Instrumentation & Human Trials Program

*Fall-Prevention Exoskeleton Program (sub-project) · Rowan University · Fall 2025 – Spring 2026 · PI: Dr. Mitja Trkov*

**Tags:** Pneumatic Actuation · KiCad · ESP32-S3 · Teensy 4.1 · Load Cell · FUTEK · Design of Experiments · Fusion 360 · 3D Printing · Human Subjects Testing

**Highlight metrics:** 2×96 trial force campaigns · 2 cylinder assembly iterations · 3 custom PCBs on the rig · Fall 2026 human-trials target

*Part of the [Fall-Prevention Exoskeleton](04-exoskeleton.md) program.*

---

## Overview & Objective

Before an exoskeleton can be trusted on a person, the actuation it relies on has to be characterized on the bench: how much force does a given pneumatic pressure actually produce at the hip joint, how does that force respond to actuation delay, and does the mechanism survive repeated cycling without drifting out of calibration. Answering that meant building a fixture that could hold the hip brace under controlled load, instrumenting it well enough to trust the numbers, and running enough trials to see a real trend instead of noise.

I own this piece of the project end to end: designed the mechanical fixture and the modular cylinder assembly, built the electronics and instrumentation, and ran every load-cell test in the campaign.

**Suggested image:** `Exoskeleton Research/Exoskeleton Bench Testing/benchtest3.jpg`: hip brace mounted on the force-testing stand with FUTEK load cell inline

## System Architecture & Technical Stack

**Modular Pneumatic Cylinder Assembly:** Early testing meant re-plumbing Bowden cables every time the team changed a test condition, which ate hours out of every session. A modular cylinder-mounting assembly, designed in Fusion 360, fixed that: the pneumatic cylinder, valve, and Bowden-cable termination mount as one swappable unit, so changing a test configuration is a fastener swap instead of a re-rig. The assembly is now on its second iteration.

**Control Board V1:** A dual-ESP32-S3 board driving and monitoring the rig, split into a primary microcontroller and a dedicated secondary microcontroller for safety features and failsafes, a deliberate redundancy decision, not just a spare MCU. Carries two INA260 current sensors (5V regulated rail, 22.2V battery supply), two DS18B20 temperature sensors, four PWM fan/tach channels for cooling, six pressure-transducer inputs, and a 16-channel screw-terminal bus feeding the relay board that switches the pneumatic solenoid valves.

**Control Board V2:** Redesigned around dual Teensy 4.1s in place of the ESP32-S3s, specifically for the structured hip-abduction protocol: carries seven pressure-transducer inputs, six string-potentiometer inputs (cylinder position, plus planned string-pot feedback for closed-loop control), an HX711 load-cell amplifier input, two thermistor channels, dual WS2812 RGB status indicators, and its own header into the Relay Board so pressure, position, and force are all logged from one board during a trial.

**Relay Board V1:** A dedicated 12-channel relay board that replaced a handful of loose solid-state relay modules from the earlier bench build, plugging directly into the control board's output header and giving every valve its own switched, flyback-protected channel.

**Suggested images:**
- `Exoskeleton Research/Control System + Test Bench/testbench2.jpg`: redesigned test bench with hip mechanism, emergency stop, pneumatic valves, gauges, and control electronics
- `Exoskeleton Research/Control Board V1/TOP.png`, `Exoskeleton Control Board.png`, `Screenshot 2025-08-09 175324.png`: Control Board V1 renders and copper routing
- `Exoskeleton Research/Control Board V1/schematic-render.png`: Control Board V1 schematic
- `Exoskeleton Research/Control Board V2/Exoskeleton Control Board V3 p2.png`, `V3.png`: Control Board V2 renders (LOAD CELL, PT5–PT7, THERM headers)
- `Exoskeleton Research/Control Board V2/schematic-render.png`: Control Board V2 schematic
- `Exoskeleton Research/Relay Board V1/RelayMainBoard1.png`, `relaymainboard.png`: Relay Board V1 render and layout
- `Exoskeleton Research/Relay Board V1/schematic-render.png`: Relay Board V1 schematic
- 3D model available: `Exoskeleton Research/Control Board V2/controlboardv2.glb` (interactive Control Board V2 model)

## Engineering Challenges & Iteration

The first version of the modular cylinder assembly proved the concept and immediately showed where it needed to improve; a second iteration has since tightened the mounting tolerances and cable routing based on what broke or drifted during the first round of trials. The instrumentation side iterated the same way: the original bench ran on a handful of loose solid-state relay modules, consolidated into Relay Board V1, a dedicated 12-channel flyback-protected board. Control Board V1's dual-ESP32-S3 architecture gave way to Control Board V2, built around dual Teensy 4.1s specifically for the structured hip-abduction protocol, adding the string-potentiometer and HX711 load-cell channels the first board never carried. The Spring 2026 bench rebuild shrank the physical footprint while adding what testing actually needed: a hardware emergency stop, switched power rails, and the pressure transducer integrated directly into Control Board V2.

With the rig and instrumentation in place, a structured test matrix was defined and run spanning six pressures and four actuation delays (96 trials total), logging force via the inline FUTEK load cell against pressure and actuation timing for every trial of the hip-abduction campaign. The rig was then reconfigured and a second, parallel 96-trial campaign was run characterizing knee extension using the same load-cell instrumentation and test structure, giving the team force data across both actuated joints and a second dataset to cross-check the trend-analysis methodology against. Every trial's data was checked and validated as viable for downstream force-vs-pressure trend analysis, which is the next step now in progress.

The bench campaign answers what the actuator can do in isolation; the next phase is characterizing it on a person. I'm working alongside **PhD student Vaibhav Vanshwarma** to develop the test procedure for human trials (what a session looks like, what gets measured, and what the safety and consent process needs to cover), with early sessions on a harness rig to work out how subjects wear the system and where the test protocol still has gaps. This human-trials work is the basis for a co-authored publication I expect to be on this year, analyzing how the exoskeleton affects the user's base of support across varying gait stages relative to unassisted walking (see the main [Fall-Prevention Exoskeleton](04-exoskeleton.md) document). In parallel, I'm developing a custom backpack enclosure to package the compute and IMU hub (Raspberry Pi 4, Teensy 4.1, and the IMU System V2 mainboard) into a single wearable unit, rather than the bench-tethered setup used for pneumatic force testing. Current work is focused on weight distribution, cable routing to the 8 limb-mounted IMU pods, and thermal management for the compute enclosure.

**Suggested image:** `Exoskeleton Research/Exoskeleton Bench Testing/benchtest2.jpg`: hip mechanism and pneumatic cylinder mounted on the TMC optical test table

**Not-yet-captured but planned visuals:** V1 vs. V2 cylinder assembly exploded-view comparison; harness-rig session photo/video with the PhD-student collaborator; custom wearable backpack enclosure prototype photo.

## Quantitative Results & Validation

- Two structured, independent 96-trial campaigns completed (hip abduction and knee extension), each spanning a 6×4 test matrix of six pressures and four actuation delays
- Force measured on every trial via an inline FUTEK load cell, read through an HX711 amplifier on Control Board V2, against commanded pressure and actuation timing
- Every trial's data checked and validated as viable for downstream force-vs-pressure trend analysis, now in progress
- Instrumentation stack (Control Board V1/V2, Relay Board V1) spans current sensing, temperature sensing, pressure transduction, cylinder-position string-potentiometers, and load-cell force measurement, all logged from a common board during a trial
- Safety protocol held constant across every trial run to date: informed consent from any participant beyond the design team, PPE and clear danger-zone awareness near actuated hardware, and a hardware emergency stop within reach at all times

**Not-yet-captured but planned visuals (flagged as priority in the original planning):**
- Hip abduction force-vs-pressure curves across all six pressures, actuation-delay as second series: headline result of the first 96-trial campaign
- Knee extension force-vs-pressure curves: second 96-trial campaign
- 6×4 trial-matrix heatmap (pressure × actuation delay) showing measured force per cell, both joints side by side
- Load-cell calibration curve (known reference weights vs. measured output)
- Representative trial video clips from each campaign

## Current Work: Toward Human Trials

*Status: In Progress · Targeting Fall 2026*

Every trial run to date has followed the same safety and consent principles the team held to during bench testing: informed consent from any participant beyond the design team, PPE and clear danger-zone awareness near actuated hardware, and a hardware emergency stop within reach at all times. The harness-rig sessions with PhD student Vaibhav Vanshwarma are the working ground for translating that bench discipline into a human-subjects procedure: what a session measures, what the consent process covers, and where the wearable hardware still needs work before a subject is asked to walk in it.

## Future Work: Toward Closed-Loop Control

Control Board V2's potentiometer inputs are already in place for the next step: closed-loop pneumatic control using a string-driven potentiometer to feed real-time cylinder position back into the control loop, rather than the open-loop actuation used for the force-testing campaign.

## Reflection

The part of this worth pointing to is the loop, not any single piece: designing the fixture that needed to exist, building the electronics to instrument it correctly, running the trials personally, and now figuring out what changes when the subject is a person instead of a load cell. That's a different kind of test than "does this pass or fail"; it's "do we even know what to measure yet," and getting that procedure right before the first human trial matters as much as any of the hardware.

---
*Note for editing: "PhD researcher" in the original site copy has been replaced with "PhD student Vaibhav Vanshwarma" per your note; double-check spelling before this goes out.*

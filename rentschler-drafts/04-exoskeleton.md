# Fall-Prevention Exoskeleton (System Overview)

*Undergraduate Engineering Clinic · Rowan University · Fall 2025 – Spring 2026 · PI: Dr. Mitja Trkov*

**Tags:** KiCad · Teensy 4.1 · BNO085 · RS-485 · ESP32 · Raspberry Pi 4 · Pneumatic Actuation · FEA · SolidWorks · Design of Experiments

**Highlight metrics:** 8-sensor IMU array · 2×96-trial force campaigns · 6 custom PCBs designed · 2 clinic semesters

*This is the system-level summary. Two sub-projects each have their own document: [IMU Sensing System](05-imu-sensing-system.md) and [Test Rig, Instrumentation & Human Trials](06-test-rig-instrumentation.md).*

---

## Overview & Objective

A pneumatically-actuated, hip-level exoskeleton engineered to sense a fall-risk motion and deliver corrective assistive force to the hip joint before a fall occurs. Falls are a leading cause of injury for older adults and people with gait or balance impairments; this Engineering Clinic project set out to build a wearable, hip-level exoskeleton that senses a fall-risk motion in real time and pneumatically assists the hip joint, actuating abduction/adduction and flexion through Bowden-cable-driven pneumatic cylinders. The two-semester program spans mechanism design, embedded orientation sensing, custom control/relay electronics, and a structured bench force-testing campaign now advancing toward human-subjects trials.

This work is conducted under **PI Dr. Mitja Trkov** as part of the Rowan University Engineering Clinic program, in collaboration with **PhD student Vaibhav Vanshwarma**, who is co-developing the human-subjects trial procedure. I own the electrical, embedded, and test-engineering side across both semesters, working alongside teammates leading the mechanical design.

**Suggested image:** `Exoskeleton Research/Exoskeleton Bench Testing/benchtest1.jpg`: hip brace and pneumatic actuator mounted to the force-testing rig, FUTEK load cell inline

## System Architecture & Technical Stack

The electronics split into two independent chains that meet on the bench: a **sensing chain** streaming 8-point body orientation up to the Raspberry Pi for future closed-loop gait detection, and an **actuation chain** that switches the pneumatic valves driving the hip cylinders during testing. During bench trials, the same control board also reads back pressure transducers, potentiometers, and a load cell so every actuation event is logged against real force data.

**Sensing chain:** 8× BNO085 IMU (RS-485 point-to-point) → Teensy 4.1 (UART aggregation, SLIP framing) → serial → Raspberry Pi 4 (gait/orientation data)

**Actuation & test chain:** ESP32 Control Board (V1/V2) → Relay Board V1 (12-channel switching) → Pneumatic Valves (AirTac solenoids) → Hip Cylinders (ab/adduction + flexion)

Technical stack, by subsystem:
- **Control & relay electronics:** Control Board V1 (dual ESP32-S3, current/temperature sensing) and Control Board V2 (dual Teensy 4.1, string-pot and load-cell instrumentation) driving Relay Board V1, a dedicated 12-channel flyback-protected switching board
- **Microcontrollers:** Teensy 4.1 (IMU host and Control Board V2), ESP32-S3 (Control Board V1), Raspberry Pi 4 (top-level data handoff and future gait-detection compute)
- **Pneumatic actuation:** AirTac solenoid valves switching Bowden-cable-driven cylinders at the hip, actuating abduction/adduction and flexion independently
- **Sensor integration:** an 8-sensor BNO085 body-orientation array streaming over RS-485 into the Teensy 4.1; see IMU Sensing System doc
- **Power:** bench platform runs on a switched 22.2V/5V rail architecture off Control Board V2
- **Communication protocols:** RS-485 differential signaling with UART framing (SLIP protocol) for the IMU array, USB serial from Teensy 4.1 to Raspberry Pi, I2C on the original first-generation sensor bus

## Mechanical Design: Chassis Redesign & FEA Validation

The original thigh brace used a plastic jointed thigh link that couldn't transmit actuation force reliably: it flexed under load instead of driving the hip joint. In Spring 2026 the team replaced it with a cuff-based brace and a system of aluminum C-channels, verified against the redesign with FEA before fabrication. This resolved the force-transmission deficiencies that had limited every earlier iteration.

The hip mechanism actuates two degrees of freedom, abduction/adduction and flexion, through Bowden-cable-linked pneumatic cylinders driven by the modular cylinder assembly and instrumentation covered in the Test Rig document.

**Suggested image:** `Exoskeleton Research/Exoskeleton Bench Testing/benchtest3.jpg`: redesigned cuff-based thigh brace on the force-testing stand with FUTEK load cell

## Engineering Challenges & Iteration

The platform's split architecture (independent sensing and actuation chains meeting on a shared, instrumented bench) meant a hard failure in one subsystem never blocked the other. That separation is what let the sensing chain go through a ground-up rebuild in the middle of the project without touching the actuation side at all: the first-generation I2C-based IMU array silently missed its own 100 Hz timing budget by a wide margin under real load, a failure that was root-caused with bench measurements rather than assumed, formally proposed as a redesign, and rebuilt around RS-485 to hit a sustained 400 Hz with zero packet loss. Full detail in the IMU Sensing System document.

The mechanical and instrumentation sides iterated the same way. The chassis moved from a plastic thigh link that flexed under load to an FEA-validated cuff-and-C-channel brace. The bench electronics moved from loose solid-state relay modules to a dedicated 12-channel flyback-protected relay board, and from a dual-ESP32-S3 control board (Control Board V1) to a dual-Teensy-4.1 control board (Control Board V2) purpose-built for the structured hip-abduction protocol, adding string-potentiometer and load-cell channels the first board didn't carry. Both redesigns, and the two 96-trial force campaigns that validated them, are covered in the Test Rig & Instrumentation document.

**Not-yet-captured but planned visuals:** FEA stress-contour plot for the redesigned cuff brace/C-channels; hip-mechanism diagram showing the two actuated DOF and Bowden-cable routing.

## Quantitative Results & Validation

- IMU sensing chain validated at a sustained 400 Hz across all 8 body-segment sensors with zero packet loss, up from a measured 54 Hz real-world ceiling on the first-generation I2C bus
- Two structured 96-trial force campaigns completed (hip abduction and knee extension), each spanning six pressures and four actuation delays, logged against a FUTEK inline load cell
- Six custom PCBs designed and built across the program: Control Board V1, Control Board V2, Relay Board V1, IMU System V1 mainboard + satellite, IMU System V2 mainboard + satellite
- Chassis redesign FEA-validated before fabrication, resolving the force-transmission failure of the original plastic thigh link
- EMI immunity of the rebuilt sensing chain confirmed with the array running adjacent to the same solenoid-driven pneumatic actuators that had corrupted the original I2C bus

## Team & Timeline

**Fall 2025:** Sarah Smith, Chase Quijano, Reuben Cuevas, Eric Carty, advised by Dr. Mitja Trkov. Built the V1 hip mechanism and the first-generation I2C-based IMU array, and identified the sampling-rate shortfall that shaped the following semester's redesign.

**Spring 2026:** Chase Quijano, Eric Carty, Preston Haddon, advised by Dr. Mitja Trkov, in collaboration with PhD student Vaibhav Vanshwarma on human-trials protocol development. Executed the chassis redesign, the IMU System V2 rebuild, the test-rig instrumentation redesign, and the two 96-trial hip-abduction and knee-extension test campaigns.

Across both semesters, I owned the electrical, embedded, and test-engineering side end to end, while collaborating with the team on the mechanical chassis redesign and FEA validation.

## Research Contribution & Publication Status

This work is ongoing, and I expect to be a co-author this year on a publication analyzing how the exoskeleton affects the user's base of support across varying gait stages, relative to walking without assistance, a direct output of the human-subjects trial program described above and in the Test Rig & Instrumentation document.

## Reflection & Future Work

The platform's split architecture (independent sensing and actuation chains that meet on a shared, well-instrumented test bench) held up across a full mechanical redesign and a ground-up sensing rebuild without either side blocking the other. That separation is what let me rebuild the IMU system in the middle of the project without touching the actuation side at all.

Next up across the program:
- Complete the force-vs-pressure trend analysis from the 96-trial hip-abduction and knee-extension datasets
- Begin closed-loop pneumatic control using a string-driven potentiometer for cylinder position feedback
- Move into human trials this fall, combining the IMU array with an OptiTrack motion-capture system for worn data acquisition
- Advance to worn testing with the gait-detection algorithm driving real-time actuation: the closed-loop fall-prevention behavior the whole platform is built toward

---
*Note for editing: I added the "solar charging / 6-DOF BLDC motor array" detail from a resume bullet in an earlier draft, then removed it: it described what reads as a separate large-format PCB effort inconsistent with the pneumatic system documented here, and I couldn't verify it against source PDFs (no PDF renderer available in this pass). Flag if that's actually a real, related sub-project you want folded in; I'd want the source material to describe it accurately rather than guess.*

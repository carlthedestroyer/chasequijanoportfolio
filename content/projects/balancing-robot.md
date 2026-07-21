number: "010"
category: "Controls"
title: "Balancing Robot — Two Generations of Control System Design"
subtitle: "Personal Project · Rowan University"

domainTags:
  - Teensy
  - MPU6050
  - Kalman Filter
  - PID
  - NEMA 17
  - DRV8825
  - ROS 2
  - Intel RealSense

summary: |
  Two-wheeled inverted-pendulum robot engineered as a closed-loop dynamic stability testbed: a Kalman-filtered IMU sensor-fusion stack estimates tilt angle and angular velocity in real time, feeding a PID controller that commands two NEMA 17 stepper motors through DRV8825 drivers to correct balance.

  The sensing and control architecture was fully designed, wired, and characterized across two hardware generations; final balance-loop gain tuning was not completed before the platform was set aside for a ROS 2 / depth-perception redesign.

specs:
  - label: "Microcontroller"
    value: "Teensy (real-time control loop)"
  - label: "IMU"
    value: "MPU6050 (onboard I2C)"
  - label: "Sensor Fusion"
    value: "Kalman filter + complementary filter cross-check"
  - label: "Control Loop"
    value: "PID, tilt-angle error → motor command"
  - label: "Actuation"
    value: "2x NEMA 17 stepper, DRV8825 drivers"
  - label: "V1 Chassis"
    value: "Aluminum extrusion frame, 3D-printed enclosure"
  - label: "V2 Compute"
    value: "Mini PC, ROS 2, Intel RealSense depth camera"

gallery:
  - src: "Balancing Robot/images/balancingrobot-control-system-diagram.png"
    caption: "Closed-loop block diagram — reference, controller (Teensy), plant, and IMU feedback path"
    tall: true
  - src: "Balancing Robot/images/balancingrobot-pid-diagram.png"
    caption: "PID loop structure driving the DRV8825/NEMA 17 actuation stage"
    tall: true
  - src: "Balancing Robot/images/balancingrobot-carlbot-front.jpg"
    caption: "Carl Bot (V1), front — battery and driver placement"
  - src: "Balancing Robot/images/balancingrobot-carlbot-back.jpg"
    caption: "Carl Bot (V1), rear — wiring harness and voltage regulation"
  - src: "Balancing Robot/images/balancingrobot-complementary-filter.jpg"
    caption: "Complementary filter reference used alongside the Kalman filter during sensor-fusion tuning"
  - src: "Balancing Robot/images/balancingrobot-v2-cutaway-pc.png"
    caption: "V2 cutaway — mini PC compartment, RealSense camera, dual cooling fans"
    tall: true
  - src: "Balancing Robot/images/balancingrobot-v2-electronics-bay.png"
    caption: "V2 electronics bay — camera, fan pair, full assembly on the drive wheels"

challenges: |
  Raw MPU6050 output was too noisy to use directly for angle estimation, so the Kalman filter was the load-bearing element of the sensing stack. A complementary filter combining accelerometer tilt with integrated gyro rate was kept as a parallel reference during tuning, since it gives an independent, computationally simple cross-check on what the Kalman filter should be converging to. That sensor-fusion layer was validated and produced clean tilt and angular-velocity estimates on Carl Bot.

  What was not completed is the balance-loop tuning itself: the PID gains driving the DRV8825/NEMA 17 stage were wired and integrated with the Kalman-filtered estimate, but never brought to a state where the robot held itself upright under closed-loop control. Development moved to a second-generation chassis — reusing the identical Teensy/MPU6050/Kalman/PID architecture — before that tuning pass was finished, so neither generation has driven under its own balance control.

  Mechanical and electronics-bay changes, V1 → V2: the V2 redesign kept the control architecture fixed and changed the platform around it. A CAD-modeled modular enclosure replaced the extrusion-frame build to make room for a mini PC running Linux/ROS 2, an Intel RealSense depth camera for point-cloud mapping, and a dedicated dual-fan cooling loop to manage heat from the onboard computer during extended operation. None of that perception hardware has yet been integrated with the balance controller — it is installed and mechanically complete, not closed-loop with the PID stack.

results:
  narrative: |
    Validation on this project stopped at the subsystem level: the Kalman-filtered tilt/angular-velocity estimate was checked against the complementary-filter reference and produced a clean signal from raw MPU6050 data, and the PID-to-driver wiring path (Teensy → DRV8825 → NEMA 17) was confirmed electrically functional. Closed-loop dynamic balance — the actual inverted-pendulum stabilization the architecture was designed to achieve — was not reached on either generation; that gain-tuning pass is the specific, well-defined next step, not a redesign.
  metrics:
    - value: "2"
      label: "Hardware Generations"
    - value: "2"
      label: "NEMA 17 Steppers"
    - value: "I2C"
      label: "MPU6050 IMU Interface"
  table:
    headers: ["Subsystem", "Status"]
    rows:
      - ["Kalman-filtered tilt / angular-velocity estimate", "Validated — clean estimate from raw MPU6050 data"]
      - ["Complementary filter cross-check", "Validated — used as tuning reference for the Kalman estimate"]
      - ["PID → DRV8825 → NEMA 17 signal path", "Wired and integrated, gains not fully tuned"]
      - ["Closed-loop dynamic balance", "Not achieved — tuning left incomplete on both generations"]
      - ["V2 mini PC / ROS 2 / RealSense integration", "Mechanically installed, not yet coupled to balance controller"]

nav:
  prev:
    slug: "ros-robot"
    title: "ROS Robot — Mobile Perception Platform"
  next:
    slug: "foc-control-rig"
    title: "Field Oriented Control Test Bench"

# Balancing Robot — Two Generations of Control System Design

*Personal Project · Rowan University*

**Tags:** Teensy · MPU6050 · Kalman Filter · PID · NEMA 17 · DRV8825 · ROS 2 · Intel RealSense

**Highlight metrics:** 2 robot generations · PID balance control loop · 2 NEMA 17 stepper motors · ROS 2 + RealSense upgrade in development

---

## Overview & Objective

Two-wheeled inverted-pendulum robot engineered as a closed-loop dynamic stability testbed: a Kalman-filtered IMU sensor-fusion stack estimates tilt angle and angular velocity in real time, feeding a PID controller that commands two NEMA 17 stepper motors through DRV8825 drivers to correct balance. The sensing and control architecture was fully designed, wired, and characterized across two hardware generations; final balance-loop gain tuning was not completed before the platform was set aside for a ROS 2 / depth-perception redesign.

## System Architecture & Technical Stack

- Teensy microcontroller runs the real-time control loop for both hardware generations — orientation sensing, filtering, and PID computation all execute on-board
- MPU6050 IMU (onboard I2C interface) supplies raw gyroscope and accelerometer measurements for orientation estimation
- Kalman filter fuses the gyro and accelerometer channels into a clean tilt-angle and angular-velocity estimate; a complementary filter was used alongside it as a reference during sensor-fusion tuning
- PID controller computes motor command from the error between estimated tilt angle and upright setpoint
- Two NEMA 17 stepper motors, driven through DRV8825 stepper drivers, provide the actuation for balance correction
- V1 ("Carl Bot") chassis: aluminum-extrusion frame with a 3D-printed enclosure; V2 chassis: CAD-redesigned modular enclosure built around a mini PC, ROS 2, and an Intel RealSense depth camera

**Suggested images (already shot, in `Balancing Robot/images/`):**
- `balancingrobot-control-system-diagram.png` — closed-loop block diagram: reference, controller (Teensy), plant, and IMU feedback path
- `balancingrobot-pid-diagram.png` — PID loop structure driving the DRV8825/NEMA 17 actuation stage from tilt-angle error
- `balancingrobot-carlbot-front.jpg` — Carl Bot (V1), front — battery and driver placement
- `balancingrobot-carlbot-back.jpg` — Carl Bot (V1), rear — wiring harness and voltage regulation

**Physical Realization note:** Carl Bot (V1) is the physical build carrying the sensing/control stack above — Teensy, MPU6050, and DRV8825 drivers wired on an aluminum-extrusion frame with a 3D-printed enclosure.

## Engineering Challenges & Iteration

Raw MPU6050 output was too noisy to use directly for angle estimation, so the Kalman filter was the load-bearing element of the sensing stack. A complementary filter combining accelerometer tilt with integrated gyro rate was kept as a parallel reference during tuning, since it gives an independent, computationally simple cross-check on what the Kalman filter should be converging to. That sensor-fusion layer was validated and produced clean tilt and angular-velocity estimates on Carl Bot.

What was not completed is the balance-loop tuning itself: the PID gains driving the DRV8825/NEMA 17 stage were wired and integrated with the Kalman-filtered estimate, but never brought to a state where the robot held itself upright under closed-loop control. Development moved to a second-generation chassis — reusing the identical Teensy/MPU6050/Kalman/PID architecture — before that tuning pass was finished, so neither generation has driven under its own balance control.

**Mechanical and electronics-bay changes, V1 → V2:** The V2 redesign kept the control architecture fixed and changed the platform around it: a CAD-modeled modular enclosure replaced the extrusion-frame build to make room for a mini PC running Linux/ROS 2, an Intel RealSense depth camera for point-cloud mapping, and a dedicated dual-fan cooling loop to manage heat from the onboard computer during extended operation. None of that perception hardware has yet been integrated with the balance controller — it is installed and mechanically complete, not closed-loop with the PID stack.

**Suggested images:**
- `balancingrobot-complementary-filter.jpg` — complementary filter reference used alongside the Kalman filter to cross-check tilt-angle convergence during tuning
- `balancingrobot-v2-cutaway-pc.png` — V2 cutaway: mini PC compartment, RealSense camera, dual cooling fans added for thermal management
- `balancingrobot-v2-electronics-bay.png` — V2 electronics bay: camera, fan pair, and full assembly on the drive wheels

## Quantitative Results & Validation

Validation on this project stopped at the subsystem level: the Kalman-filtered tilt/angular-velocity estimate was checked against the complementary-filter reference and produced a clean signal from raw MPU6050 data, and the PID-to-driver wiring path (Teensy → DRV8825 → NEMA 17) was confirmed electrically functional. Closed-loop dynamic balance — the actual inverted-pendulum stabilization the architecture was designed to achieve — was not reached on either generation; that gain-tuning pass is the specific, well-defined next step, not a redesign.

| Subsystem | Status |
|---|---|
| Kalman-filtered tilt / angular-velocity estimate | **Validated** — clean estimate from raw MPU6050 data |
| Complementary filter cross-check | **Validated** — used as tuning reference for the Kalman estimate |
| PID → DRV8825 → NEMA 17 signal path | Wired and integrated, gains not fully tuned |
| Closed-loop dynamic balance | Not achieved — tuning left incomplete on both generations |
| V2 mini PC / ROS 2 / RealSense integration | Mechanically installed, not yet coupled to balance controller |

---
*Note for editing: I described the MPU6050 as having an "onboard I2C interface" — this is a datasheet fact about the part (it only exposes I2C), not a claim from original source material, worth confirming you're comfortable stating it that way.*

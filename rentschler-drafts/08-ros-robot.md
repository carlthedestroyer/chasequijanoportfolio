# ROS Robot — Mobile Perception Platform on ROS 2 Iron

*Personal Project · Rowan University*

**Tags:** ROS 2 Iron · RPLiDAR A1 · Intel RealSense · Teensy · Point Cloud Perception

**Highlight metrics:** ROS 2 Iron on Linux mini PC · RPLiDAR A1 2D scanning · 22.2V 6000mAh LiPo power · Custom 10mm-fan cooling

---

## Overview & Objective

Engineered a mobile robot platform running ROS 2 Iron on an onboard Linux mini PC, integrating an RPLiDAR A1 2D scanning unit and an Intel RealSense depth camera into a working sensing stack that publishes live scan and point-cloud data. Built as a testbed for autonomous ground navigation: the perception pipeline is validated and operating in real time, while the downstream SLAM/path-planning loop that would close the autonomy loop was not completed before the project was set aside.

## System Architecture & Technical Stack

- ROS 2 Iron middleware running on a Linux-based mini PC, serving as the central compute and message-passing layer for the sensor nodes
- RPLiDAR A1 publishing a 360-degree 2D planar scan into ROS 2 for localization and obstacle detection
- Intel RealSense depth camera publishing a full RGB point cloud, extending perception into 3D and covering obstacles outside the LiDAR's scan plane
- Teensy microcontroller performing low-level drive-motor control, commanding the motors through a stepper driver breakout board
- 22.2V 6000mAh LiPo battery with a step-down voltage regulator supplying separate power rails for the mini PC and the drive electronics
- Custom chassis with a dedicated 10mm-fan cooling loop to manage thermal load on the onboard compute during sustained sensing operation

**Suggested images (in `ROS Robot/images/`):**
- `rosrobot-rplidar-mapping.png` — RPLiDAR A1 2D scan, polar plot of a room, published live into ROS 2
- `rosrobot-pointcloud-mapping.png` — Intel RealSense RGB point cloud, 3D reconstruction of the test environment
- `rosrobot-front.jpg` — front view: RPLiDAR, RealSense, and drive wheels
- `rosrobot-top-front.jpg` — top-front view: sensor mounting and wiring routing to the compute bay

**Physical Realization note:** the sensing stack is carried by a custom chassis — RPLiDAR A1 and Intel RealSense top-mounted for a clear field of view, mini PC/Teensy/stepper drivers/battery packaged in the base structure below.

## Engineering Challenges & Iteration

Integrating two independent sensing modalities — the RPLiDAR's 2D planar scan and the RealSense's 3D RGB point cloud — into a single coherent ROS 2 pipeline required getting both drivers publishing cleanly and concurrently on the mini PC without resource contention, alongside wiring the power and thermal management (22.2V LiPo, step-down regulator, custom fan cooling) needed to sustain that compute load inside a chassis with limited volume. That integration work is complete and validated: the scan and point-cloud captures are live sensor output from the assembled robot, not simulated data.

**What was not built is the layer that would consume this sensor data** — SLAM or an occupancy map fused from both sensors, and a closed-loop path-planning stack driving the Teensy-controlled motors off that map. That is a deliberate, scoped stopping point rather than an unexplained gap: the sensing stack was brought to a working, characterized state before the project was set aside, and the navigation stack is the clearly identified next phase to build on top of it, not a restart from bring-up.

**Suggested images:**
- `rosrobot-internal-wiring.jpg` — internal wiring, top cover removed: dual stepper drivers, Teensy, step-down voltage regulator
- `rosrobot-8k-loop.gif` — live RPLiDAR A1 scan loop, sweeping and re-plotting a room in real time (white line = current scan angle, red points = detected surfaces) — the deterministic sensing loop this project was scoped to deliver

## Quantitative Results & Validation

Validation on this project is scoped to the sensing/perception pipeline: the RPLiDAR A1 and Intel RealSense were both characterized publishing continuously into ROS 2, and the 360-degree scan and RGB point-cloud captures are live sensor output from the assembled robot, not simulated. **No autonomous navigation or path-following performance data exists for this platform, because that control loop was not built** — the sensing stack is validated and ready to serve as the input layer for a navigation stack, but the robot does not yet act on what it senses.

**Suggested image:** `rosrobot-demo.gif` — fully assembled hardware; sensing stack complete, navigation loop not implemented

---
*Note for editing: no RPLiDAR A1 scan-rate/resolution number (Hz, samples/sec) is cited anywhere in source material, so none is claimed here — if you have the real spec documented elsewhere, that's the one number worth adding to Validation for extra rigor.*

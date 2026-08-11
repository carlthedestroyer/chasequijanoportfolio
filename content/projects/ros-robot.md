number: "007"
category: "Autonomous Robotics"
title: "ROS Robot — Mobile Perception Platform"
subtitle: "Personal Project · Rowan University"
# repoHref: "https://github.com/you/ros-robot"   # TODO: add once a repo URL exists

domainTags:
  - ROS 2 Iron
  - RPLiDAR A1
  - Intel RealSense
  - Teensy
  - Point Cloud Perception

summary: |
  Engineered a mobile robot platform running ROS 2 Iron on an onboard Linux mini PC, integrating an RPLiDAR A1 2D scanning unit and an Intel RealSense depth camera into a working sensing stack that publishes live scan and point-cloud data.

  Built as a testbed for autonomous ground navigation: the perception pipeline is validated and operating in real time, while the downstream SLAM/path-planning loop that would close the autonomy loop was not completed before the project was set aside.

specs:
  - label: "Compute"
    value: "Linux mini PC, ROS 2 Iron"
  - label: "2D Sensing"
    value: "RPLiDAR A1, 360° planar scan"
  - label: "3D Sensing"
    value: "Intel RealSense, RGB point cloud"
  - label: "Drive Control"
    value: "Teensy + stepper driver breakout"
  - label: "Power"
    value: "22.2V 6000mAh LiPo, step-down regulator"
  - label: "Thermal Management"
    value: "Dedicated 10mm-fan cooling loop"

demoVideo:
  src: "ROS Robot/videos/demo.mp4"
  poster: "ROS Robot/images/rosrobot-front.jpg"
  caption: "RPLiDAR and RealSense streaming live into ROS 2 simultaneously as the platform is carried through a room."

gallery:
  - src: "ROS Robot/images/rosrobot-rplidar-mapping.png"
    caption: "RPLiDAR A1 2D scan — polar plot of a room, published live into ROS 2"
    tall: true
  - src: "ROS Robot/images/rosrobot-pointcloud-mapping.png"
    caption: "Intel RealSense RGB point cloud — 3D reconstruction of the test environment"
    tall: true
  - src: "ROS Robot/images/rosrobot-front.jpg"
    caption: "Front view — RPLiDAR, RealSense, and drive wheels"
  - src: "ROS Robot/images/rosrobot-top-front.jpg"
    caption: "Top-front view — sensor mounting and wiring routing to the compute bay"
  - src: "ROS Robot/images/rosrobot-internal-wiring.jpg"
    caption: "System wiring diagram — RPLiDAR, RealSense, Teensy, stepper drivers, and the 22.2V LiPo power/thermal path"
    tall: true
  - src: "ROS Robot/images/rosrobot-internal-wiring.jpg"
    caption: "Internal wiring, top cover removed — dual stepper drivers, Teensy, step-down voltage regulator"
  - src: "ROS Robot/images/rosrobot-8k-loop.gif"
    tall: true
    caption: "Live RPLiDAR A1 scan loop, sweeping and re-plotting a room in real time — white line marks the current scan angle, red points are detected surfaces"
  - src: "ROS Robot/images/rosrobot-demo.gif"
    caption: "Fully assembled hardware — sensing stack complete, navigation loop not implemented"

challenges: |
  Integrating two independent sensing modalities — the RPLiDAR's 2D planar scan and the RealSense's 3D RGB point cloud — into a single coherent ROS 2 pipeline required getting both drivers publishing cleanly and concurrently on the mini PC without resource contention, alongside wiring the power and thermal management (22.2V LiPo, step-down regulator, custom fan cooling) needed to sustain that compute load inside a chassis with limited volume. That integration work is complete and validated: the scan and point-cloud captures are live sensor output from the assembled robot, not simulated data.

  What was not built is the layer that would consume this sensor data — SLAM or an occupancy map fused from both sensors, and a closed-loop path-planning stack driving the Teensy-controlled motors off that map. That is a deliberate, scoped stopping point rather than an unexplained gap: the sensing stack was brought to a working, characterized state before the project was set aside, and the navigation stack is the clearly identified next phase to build on top of it, not a restart from bring-up.

results:
  narrative: |
    Validation on this project is scoped to the sensing/perception pipeline: the RPLiDAR A1 and Intel RealSense were both characterized publishing continuously into ROS 2, and the 360-degree scan and RGB point-cloud captures are live sensor output from the assembled robot, not simulated.

    No autonomous navigation or path-following performance data exists for this platform, because that control loop was not built — the sensing stack is validated and ready to serve as the input layer for a navigation stack, but the robot does not yet act on what it senses.
  metrics:
    - value: "360°"
      label: "2D LiDAR Scan Coverage"
    - value: "Live"
      label: "RGB Point Cloud, Real-Time"
    - value: "2"
      label: "Independent Sensing Modalities Fused"

nav:
  prev:
    slug: "digital-scale"
    title: "Custom Digital Scale"
  next:
    slug: "balancing-robot"
    title: "Balancing Robot — Two Generations of Control System Design"

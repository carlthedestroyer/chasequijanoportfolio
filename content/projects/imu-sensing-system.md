number: "002A"
category: "Engineering Clinic Research"
title: "IMU Sensing System"
subtitle: "Fall-Prevention Exoskeleton Program (sub-project) · Rowan University · Jan 2024 – Present · PI: Dr. Mitja Trkov"
# repoHref: "https://github.com/you/exoskeleton-imu-firmware"   # TODO: add once a repo URL exists

domainTags:
  - BNO085
  - Teensy 4.1
  - RS-485
  - UART
  - I2C
  - EMI Hardening

summary: |
  An eight-sensor system built on BNO085 inertial measurement units placed at the thighs, calves, ankles, lower back, and upper back, fully contained in custom 3D-printed enclosures with adjustable straps for wearability. The system is built on a custom PCB with 16 full-duplex RS-485 transceivers (TI SN65HVD) and a Teensy 4.1, selected for its 600MHz clock and eight independent hardware UART channels, exactly matching the sensor count for simultaneous acquisition from all IMUs. Custom shielded Cat6 twisted-pair cables, length-adjustable and modular on both ends, provide EMI resistance directly adjacent to pneumatic solenoid valves and switching regulators.

  The Teensy 4.1 owns all sensor communication and streams normalized quaternion data over serial to a Raspberry Pi running the gait-detection algorithm; when the algorithm flags abnormal gait indicative of a potential fall, it issues a serial command to a dedicated control board that actuates the pneumatic cylinders to assist the user. This separation of concerns dedicates the Pi to gait analysis, leaves headroom for algorithm growth, and isolates data acquisition from processing.

specs:
  - label: "IMU"
    value: "8x BNO085, placed at thighs, calves, ankles, lower back, and upper back"
  - label: "Host MCU"
    value: "Teensy 4.1 — 600MHz clock, 8 independent hardware UART channels"
  - label: "Transceivers"
    value: "16x full-duplex RS-485 (TI SN65HVD)"
  - label: "Cabling"
    value: "Custom shielded Cat6 twisted-pair, length-adjustable, modular both ends"
  - label: "Measured Frame Latency"
    value: "0.33ms @ 921,600bps UART (vs. 18.34ms on the prior I2C system)"
  - label: "Sustained Rate"
    value: "400Hz sustained, all 8 sensors, 0.0% packet loss (10-min trial)"
  - label: "Host Handoff"
    value: "Serial (quaternion data) → Raspberry Pi → control board (pneumatic actuation)"

configVideosLabel: "Demonstrations"
configVideosTitle: "Demonstrations"
configVideos:
  - src: "Exoskeleton Research/overleafportfoliopdf/videos/imu-demo.mp4"
    poster: "Exoskeleton Research/overleafportfoliopdf/images/treadmill.jpg"
    caption: "Treadmill walking trial — the IMU orientation stream compared live against OptiTrack optical ground truth."
  - src: "Exoskeleton Research/overleafportfoliopdf/videos/imu-freeroam-demo.mp4"
    poster: "Exoskeleton Research/overleafportfoliopdf/images/imu-freeroam-poster.jpg"
    caption: "Untethered free-roam walking trial — the full 8-node array streaming over RS-485 with no fixed tether or overhead rig."

gallery:
  - src: "Exoskeleton Research/overleafportfoliopdf/images/v1_pcb.jpg"
    caption: "IMU System V1, the original I2C architecture: fully assembled custom multiplexer PCB."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/v1_nodes.jpg"
    caption: "IMU System V1: the eight body-segment sensor nodes on their straps."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/v1_worn_corner.jpg"
    caption: "Worn testing of the first-generation I2C array."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/v1_worn_side.jpg"
    caption: "First-generation array worn, side view."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/v1_hub.jpg"
    caption: "Belt-mounted acquisition hub with per-segment channels, V1 architecture."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/worn_system.jpg"
    caption: "IMU System V2 worn for data acquisition: each sensor at its designated anatomical location on custom adjustable straps."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/mainboard_nodes.jpg"
    caption: "Custom Teensy 4.1 mainboard and BNO085 sensor nodes: simultaneous logging at up to 400Hz per node over the full-duplex RS-485 matrix."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/imu-mainboard-schematic.png"
    caption: "Mainboard schematic — Teensy 4.1 paired with 16x RS-485 transceivers (TI SN65HVD) wired to eight independent hardware UART channels"
    tall: true
  - src: "Exoskeleton Research/overleafportfoliopdf/images/imu-mainboard-pcb-layout.png"
    caption: "Mainboard PCB layout — copper routing for the RS-485 transceiver matrix"
  - src: "Exoskeleton Research/overleafportfoliopdf/images/enclosures.jpg"
    caption: "Assembled 8-node array: compact, low-profile modular housings keep hardware light, secure, and unobtrusive during human movement testing."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/imu_system_case.jpg"
    caption: "The full 8-node array packed in a custom foam-cut hard case with the mainboard and cabling — built for transport between the lab and trial sites."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/treadmill.jpg"
    caption: "Treadmill walking trial with the IMU system worn, validated simultaneously against an OptiTrack optical motion-capture system, with reflective markers tracked alongside the IMU array."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/optitrack.jpg"
    caption: "OptiTrack Motive software reconstructing the reflective-marker skeleton in real time during the walking trials, serving as optical ground truth alongside the IMU data."

challenges: |
  #### The I2C Bottleneck

  The previous I2C-based iteration had three fundamental limitations: no differential signaling (EMI susceptibility), cable lengths beyond rated specification, and multiplexer latency compounded by 1–3ms of sensor-fusion clock stretching per IMU. Modeled end to end, a frame took 2.34ms of transfer plus 8 × 2ms of clock stretching = 18.34ms, exceeding the 10ms window required for 100Hz sampling.

  | Parameter | I2C (actual) | UART (921,600bps) | UART (6MHz max) |
  |---|---|---|---|
  | Frame latency | 18.34ms | 0.33ms | 0.051ms |
  | Bus utilization at 100Hz | 183.4% | 3.3% | 0.51% |

  #### Rebuilding Around RS-485

  I documented this failure analysis, then rebuilt the system around UART over RS-485: industrial-grade noise immunity, cable ratings beyond 100m, and point-to-point channels on which all eight sensors transmit simultaneously. The IMU System V2 mainboard pairs a Teensy 4.1 with 16 full-duplex RS-485 transceivers (TI SN65HVD) and custom shielded Cat6 twisted-pair cabling, chosen specifically for EMI resistance directly adjacent to the pneumatic solenoid valves and switching regulators on the same platform.

  #### Validation: 10-Minute Sustained Trial

  A 10-minute sustained trial logging all eight IMUs simultaneously validated the system:

  | Metric | Result |
  |---|---|
  | Sampling rate | 400Hz sustained (ref.: Delsys 120Hz, Xsens 240Hz) |
  | Packet interval | < 2.5ms consistent |
  | Packet loss | 0.0% |
  | Mean orientation error | 0.003% (unit-quaternion magnitude deviation) |

  The result was cross-validated on a treadmill walking trial against an OptiTrack optical motion-capture system, with the reflective-marker skeleton reconstructed in real time by OptiTrack Motive serving as ground truth alongside the IMU array.

results:
  narrative: |
    The rebuilt RS-485/UART sensing chain was validated at a sustained 400Hz across all 8 body-segment sensors with 0.0% packet loss and a mean orientation error of 0.003%, over a 10-minute continuous trial. Measured frame latency dropped from 18.34ms on the original I2C architecture to 0.33ms on the rebuilt UART system at standard 921,600bps — roughly a 55x reduction — with the new architecture also cross-validated against OptiTrack optical ground truth during treadmill walking trials.
  metrics:
    - value: "400 Hz"
      label: "Sustained, All 8 Sensors"
    - value: "0.0%"
      label: "Packet Loss"
    - value: "0.003%"
      label: "Mean Orientation Error"
    - value: "~55x"
      label: "Frame Latency Reduction vs. I2C"
  table:
    headers: ["Metric", "Result"]
    rows:
      - ["Sampling rate", "400 Hz sustained (ref.: Delsys 120 Hz, Xsens 240 Hz)"]
      - ["Packet interval", "< 2.5 ms consistent"]
      - ["Packet loss", "0.0%"]
      - ["Mean orientation error", "0.003% (unit-quaternion magnitude deviation)"]

nav:
  prev:
    slug: "exoskeleton"
    title: "Fall-Prevention Exoskeleton"
  next:
    slug: "test-rig-instrumentation"
    title: "Test Rig, Instrumentation & Human Trials Program"

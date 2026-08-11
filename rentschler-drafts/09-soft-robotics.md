# Modular Flexible PCB for Self-Reconfigurable Soft Robotics

*Undergraduate Research Assistant · Rowan Robotics Lab (PI: Dr. Mitja Trkov) · 2025*

**Tags:** Flex PCB · KiCad 9 · DRV8833 · CD74HC4067 · Seeeduino XIAO · I2C · FPC Connector · SMD Reflow · Pneumatics

**Highlight metrics:** 2 full board revisions · 96×28mm module PCB footprint · Forthcoming 2025 co-authored publication · Patent-track research status

**This is the highest-priority document in this set**: real published/forthcoming research under an active PI, not just a personal project. The authorship framing below is deliberate and should not be loosened: contributor to a larger effort led by PI Dr. Mitja Trkov and graduate researcher Joshua Knospler, not sole author of the underlying research.

---

## Overview & Objective

Engineered the flexible mainboard electronics for a self-reconfiguring soft robot module: a two-layer KiCad flex PCB, fit to a 96×28mm footprint, that drives pneumatic actuation, reads a resistive bend sensor, and carries power and I2C communication to neighboring modules across the platform. Designed under **PI Dr. Mitja Trkov** in the Rowan Robotics Lab, working alongside **graduate researcher Joshua Knospler** to integrate the boards into the physical multi-module system; the electronics contribution is cited in a forthcoming 2025 co-authored publication, with the underlying research now under evaluation for patenting.

## System Architecture & Technical Stack

- Routed a two-layer flexible PCB in KiCad 9, sized to the 96×28mm module envelope and specified to hold roughly 1° of continuous flexion during normal operation without trace failure
- Integrated 2× DRV8833PW dual H-bridge drivers for bidirectional pneumatic actuator control, sized to the actuator current draw
- Added a CD74HC4067M 16-channel analog multiplexer to read multiple module I/O lines back through a single ADC pin, conserving microcontroller pin count on the flex substrate
- Integrated a resistive bend sensor in a voltage-divider configuration with a 4.7kΩ pull-down, read on an analog input, for positional/flexion sensing on the module
- Implemented inter-module power and I2C communication through PAC (Power/Actuator/Comms) connector pads carrying SCL, SDA, VCC, GND, and actuator outputs between adjacent modules
- Rev B (V2) decoupled the microcontroller from the mainboard: a compact 11-pin FPC connector (FH35C-11S, 0.35mm pitch) links to a separate Seeeduino XIAO daughterboard, so an MCU or firmware change no longer forces a mainboard re-fabrication
- Hand-assembled every board using SMD reflow (solder paste, hot plate + heat gun, no reflow oven), with microscope inspection for joint integrity and trace-bridging before integration

**Mechanical envelope:** the mainboard footprint was constrained by the soft robotic module housing itself: 96×28mm, two copper layers to stay within the lab's research budget rather than justify a four-layer flex stackup, with mounting holes and a connector notch fixed by the module's mechanical design.

**Suggested images (in `Soft Robotics Research/images/`):**
- `pcb-render-v2-front.png`: Rev B mainboard, front, dual DRV8833 actuator drivers, CD74HC4067 mux, 11-pin FPC connector (FH35C-11S) to the Seeeduino XIAO daughterboard
- `schematic-v2.png`: Rev B schematic, PAC connector I2C/power bus, bend-sensor divider, FPC handoff to the secondary MCU board
- `mechanical-dimensions.png`: module PCB mechanical dimension drawing, 96×28mm outline with mounting holes and connector notch

## Engineering Challenges & Iteration

Rev A came back from fabrication with 2–3 incorrect traces, which had to be corrected with hand-soldered wire jumpers before the boards were usable: a direct, first-hand lesson in the cost of skipping a second design review before sending a flex board out. The microcontroller interface on Rev A was also implemented as multiple discrete pads directly on the mainboard, coupling the MCU footprint to the mainboard's own fabrication cycle.

Rev B corrected the routing errors and iterated on both the actuator drive stage and the MCU interface: through-hole 2N2222 transistors driving the pneumatic solenoid valves were replaced with SMD AO3400A MOSFETs to cut footprint and simplify reflow, and the MCU pads were replaced with the 11-pin FPC connector to a separate Seeeduino XIAO board: a modularity change that means a bad microcontroller or firmware revision no longer requires re-fabricating the whole mainboard. Every board, Rev A and Rev B, was hand-assembled and reflow-soldered on a flexible polyimide substrate rather than rigid FR4, which demands tighter thermal control at the hot plate/heat gun stage to avoid delaminating the flex laminate, and each board was checked under a microscope for solder joint integrity and trace bridging before it went into a module.

**Module integration:** working with graduate researcher Joshua Knospler, matched the mainboard's form factor to the module's mechanical design and assisted in module assembly, including wiring the PAC connector harnesses that carry power, I2C, and actuator lines between adjacent modules.

**Suggested images:**
- `fabricated-boards-photo.png`: freshly reflowed Rev B boards, hot-plate/heat-gun assembled, next to the build checklist
- `rev2-board-closeup-photo.png`: Rev B mainboard close-up, SMD reflow joints on the flexible polyimide substrate, post-microscope inspection
- `pac-connectors-photo.png`: PAC connector harness assembly, power, I2C, and actuator lines between adjacent modules
- `assembled-module-photo1.png`: Rev B mainboard integrated into a printed module housing, motors and PAC harness connected

## Quantitative Results & Validation

Initial electrical validation confirmed continuity and power integrity across the assembled Rev B boards, and modules successfully powered their actuators under load with stable performance, including a pneumatic inflation test of an assembled module. Full system-level validation and long-term flexion-cycle reliability testing were planned as the next research phase and had not been completed as of this writing.

| Item | Status |
|---|---|
| Board revisions | 2 (Rev A → Rev B) |
| Module PCB footprint | 96 × 28mm, two-layer flex |
| Continuity / power-integrity check | **Confirmed** on assembled Rev B boards |
| Actuator drive under load | **Stable**, including a module pneumatic inflation test |
| Long-term flexion-cycle testing | Planned for next research phase, not yet completed |
| Publication status | Cited in a forthcoming 2025 co-authored publication |
| IP status | Underlying research under evaluation for patenting |

This electronics contribution is part of a forthcoming 2025 publication on which I am a co-author, extending prior work from the Rowan Robotics Lab (PI: Dr. Mitja Trkov) on self-reconfigurable modular soft robots. I am not directly involved in the patent evaluation process itself; the PCB design work forms part of the technical foundation supporting that direction.

**For reference, prior publications from the lab (PI: Dr. Mitja Trkov), already cited on the public site page:**
1. J. Knospler, W. Xue, and M. Trkov, "Reconfigurable modular soft robots with modulating stiffness and versatile task capabilities," *Smart Materials and Structures*, vol. 33, no. 6, pp. 065040, May 2024.
2. J. Knospler, N. Pagliocca, W. Xue, and M. Trkov, "TendrilBot: Modular Soft Robot with Versatile Radial Grasping and Locomotion Capabilities," *Sensors and Actuators A: Physical*, pp. 115835, Aug. 2024.
3. J. Knospler, W. Xue, and M. Trkov, "MagBot: Reconfigurable Modular Soft Pneumatic Actuators with Tunable Magnetic Connection Mechanism," IEEE AIM, pp. 1284–1289, Jul. 2024.
4. J. Knospler, W. Xue, and M. Trkov, "A Shared Electrical-Pneumatic and Reversible Locking Intermodule Connector for Modular Robots," IEEE AIM, pp. 160–165, Jul. 2024.
5. J. Knospler, N. Pagliocca, W. Xue, and M. Trkov, "Realizing Modular Self-reconfiguring Soft Robots through Inter-module Communication and Model Checking," IEEE RoboSoft, pp. 1–6, Apr. 2025.

**Suggested image:** `multi-module-assembly-photo.png`: multiple soft robotic modules with Rev B mainboards installed, assembled together on the bench

---
*Note for editing: the sentence about flex/polyimide reflow "demanding tighter thermal control to avoid delaminating the flex laminate" is a reasonable, domain-accurate engineering inference, not a claim stated explicitly in the source paper; worth confirming you're comfortable standing behind it if this gets probed on. Everything else here (authorship framing, PI/collaborator names, publication/patent status, all specs) traces directly to the resume, the original site page, or the source PDF.*

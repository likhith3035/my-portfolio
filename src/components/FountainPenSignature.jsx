import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlay,
  FaRedo,
  FaEraser,
  FaUndo,
  FaDownload,
  FaCheck,
  FaStamp,
  FaTimes,
  FaPenNib,
  FaFeatherAlt,
  FaPalette,
  FaExternalLinkAlt,
  FaAward
} from 'react-icons/fa';
import { sound } from '../utils/sound';

// ══════════════════════════════════════════════════════════════════
// EXACT SVG CALLIGRAPHY PATHS & SPINES
// ══════════════════════════════════════════════════════════════════
const KAMI_BODY =
  "M 31.500 0.943 C 25.409 3.431, 14.126 19.271, 4.914 38.266 C 0.353 47.673, -0.164 49.346, 0.825 51.516 C 2.632 55.482, 4.504 54.450, 7.856 47.642 C 10.818 41.624, 20.678 30, 22.820 30 C 24.762 30, 22.685 34.134, 18.283 39.030 C 15.825 41.764, 13.181 44, 12.407 44 C 11.478 44, 11 45.136, 11 47.345 C 11 55.387, 20.431 56.477, 28.114 49.321 L 30.727 46.887 31.333 49.917 C 32.176 54.129, 36.073 55.062, 40.169 52.033 L 43.178 49.809 44.646 51.904 C 46.602 54.698, 50.190 54.552, 53.778 51.533 L 56.709 49.067 57.869 51.612 C 58.507 53.012, 59.551 53.983, 60.188 53.771 C 60.826 53.558, 63.101 50.485, 65.243 46.942 C 70.478 38.283, 79.945 28.611, 81.582 30.249 C 81.808 30.475, 79.982 34.791, 77.525 39.840 C 73.851 47.388, 73.225 49.462, 74.004 51.510 C 75.339 55.021, 77.222 54.605, 79.523 50.293 C 84.512 40.940, 95.820 28.487, 97.656 30.323 C 97.987 30.654, 96.335 34.971, 93.985 39.917 C 89.844 48.630, 89.763 48.989, 91.379 51.455 C 93.678 54.964, 97.606 54.774, 102.272 50.927 C 105.488 48.276, 106 48.111, 106 49.727 C 106 53.997, 111.019 55.344, 115.641 52.315 C 118.253 50.604, 128 38.408, 128 36.851 C 128 34.805, 125.981 36.414, 121.432 42.085 C 116.697 47.989, 113.388 50.722, 112.297 49.630 C 112.005 49.338, 113.869 45.208, 116.440 40.453 C 121.503 31.088, 121.833 28.212, 118.059 26.338 C 115.693 25.163, 115.535 25.324, 112.897 31.575 C 108.878 41.103, 97 54.032, 97 48.881 C 97 48.265, 98.605 45.119, 100.567 41.889 C 104.860 34.822, 105.999 31.230, 104.893 28.241 C 103.439 24.311, 97.466 25.478, 91.750 30.809 L 89 33.374 89 30.887 C 89 25.260, 83.441 24.363, 77.733 29.069 C 75.685 30.756, 74.260 31.486, 74.566 30.689 C 75.061 29.398, 70.826 25, 69.088 25 C 68.734 25, 67.149 27.976, 65.564 31.613 C 63.565 36.201, 60.707 40.260, 56.233 44.863 C 52.663 48.537, 49.582 50.975, 49.333 50.325 C 48.833 49.018, 51.481 43.465, 56.013 36.318 C 60.938 28.552, 59.722 26.307, 50.502 26.149 C 43.823 26.034, 39.678 28.875, 33.748 37.632 C 28.892 44.804, 21.648 51.269, 19.028 50.770 C 15.902 50.175, 16.773 46.577, 20.534 44.552 C 24.283 42.533, 29.025 37.233, 31.040 32.813 C 31.915 30.891, 31.922 29.723, 31.068 28.126 C 29.156 24.554, 23.559 25.526, 18.114 30.375 L 15.729 32.500 16.895 30.259 C 17.536 29.027, 20.409 26.264, 23.280 24.121 C 29.920 19.162, 34.258 14.528, 36.829 9.647 C 38.951 5.618, 38.773 3.348, 36.169 1.250 C 34.410 -0.167, 34.247 -0.178, 31.500 0.943 M 30.831 8.529 C 28.999 10.470, 26.014 14.580, 24.198 17.662 L 20.897 23.265 24 20.653 C 28.398 16.952, 36 7.866, 36 6.310 C 36 4.110, 34.323 4.830, 30.831 8.529 M 44.173 32.827 C 42.068 34.932, 39.368 38.674, 38.173 41.143 C 35.945 45.745, 35.278 51, 36.922 51 C 39.312 51, 48.565 37.495, 50.454 31.250 C 51.530 27.695, 48.560 28.440, 44.173 32.827";

const KAMI_HEART =
  "M 119.209 13.853 C 118.164 14.513, 118.156 15.554, 119.167 19.334 C 120.602 24.701, 122.412 25.265, 127.750 22.011 C 133.042 18.784, 131.032 14.298, 125.436 16.847 C 124.096 17.458, 123 17.603, 123 17.170 C 123 15.319, 120.438 13.077, 119.209 13.853";

const LIKHITH_BODY =
  "M 172.699 3.076 C 164.913 8.233, 155.527 22.343, 150.862 35.902 C 148.735 42.084, 148.485 47.152, 150.150 50.316 C 152.594 54.959, 155.975 55.162, 162.100 51.034 C 165.921 48.458, 166.547 48.293, 166.858 49.784 C 167.819 54.397, 172.287 55.356, 177.044 51.969 L 179.896 49.938 180.983 51.969 C 182.816 55.392, 184.590 54.275, 187.856 47.642 C 190.818 41.624, 200.678 30, 202.820 30 C 204.762 30, 202.685 34.134, 198.283 39.030 C 195.825 41.764, 193.181 44, 192.407 44 C 190.287 44, 190.607 50.334, 192.829 52.345 C 195.521 54.782, 201.117 54.410, 205.389 51.511 L 209.058 49.021 210.004 51.511 C 211.528 55.520, 213.515 54.424, 216.825 47.750 C 219.791 41.768, 229.837 30, 231.978 30 C 233.637 30, 233.191 31.668, 229.631 38.775 C 224.772 48.476, 224.552 49.552, 226.949 51.949 C 229.816 54.816, 232.928 54.508, 237.272 50.927 C 240.488 48.276, 241 48.111, 241 49.727 C 241 54.921, 247.039 55.407, 252.536 50.655 L 256.406 47.310 257.953 50.405 C 260.039 54.579, 264.240 55.005, 269.319 51.558 L 273.058 49.021 274.004 51.511 C 275.528 55.520, 277.515 54.424, 280.825 47.750 C 283.791 41.768, 293.837 30, 295.978 30 C 297.637 30, 297.191 31.668, 293.631 38.775 C 288.772 48.476, 288.552 49.552, 290.949 51.949 C 294.478 55.478, 297.581 54.587, 303.830 48.250 C 309.403 42.598, 312.848 37.515, 311.809 36.476 C 311.519 36.185, 308.098 39.215, 304.207 43.207 C 300.316 47.199, 296.782 50.115, 296.354 49.687 C 295.926 49.259, 297.750 44.839, 300.408 39.865 C 304.584 32.050, 305.091 30.494, 304.141 28.411 C 302.516 24.843, 297.499 25.140, 292.709 29.088 C 289.171 32.005, 289.024 32.042, 290.066 29.754 C 290.674 28.421, 292.423 26.591, 293.953 25.687 C 303.214 20.216, 312.666 7.794, 310.958 3.338 C 309.609 -0.182, 306.362 -0.523, 302.128 2.411 C 299.600 4.163, 297.073 5, 294.311 5 C 292.066 5, 288.782 5.609, 287.013 6.353 C 284.034 7.605, 283.622 7.531, 281.443 5.353 C 278.203 2.112, 276.618 2.401, 275.136 6.500 C 274.440 8.425, 273.487 10, 273.018 10 C 271.412 10, 262.716 14.050, 263.226 14.560 C 263.507 14.840, 265.619 14.646, 267.920 14.129 C 270.221 13.612, 271.968 13.499, 271.802 13.878 C 268.745 20.852, 258.767 38.789, 255.713 42.801 C 251.796 47.947, 248.383 50.717, 247.297 49.630 C 247.005 49.338, 248.869 45.208, 251.440 40.453 C 256.506 31.083, 256.834 28.213, 253.052 26.334 C 250.671 25.151, 250.526 25.304, 247.793 31.848 C 245.749 36.746, 243.358 40.187, 239.018 44.482 C 235.737 47.729, 232.720 50.053, 232.314 49.647 C 231.908 49.241, 233.750 44.839, 236.408 39.865 C 240.584 32.050, 241.091 30.494, 240.141 28.411 C 238.516 24.843, 233.499 25.140, 228.709 29.088 C 225.171 32.005, 225.024 32.042, 226.066 29.754 C 226.674 28.421, 228.423 26.591, 229.953 25.687 C 239.214 20.216, 248.666 7.794, 246.958 3.338 C 243.819 -4.852, 232.291 4.622, 221.208 24.500 C 212.862 39.469, 209.735 43.939, 205.058 47.583 C 200.228 51.346, 197.667 51.641, 197.213 48.487 C 197.009 47.075, 197.976 45.929, 200.534 44.552 C 204.283 42.533, 209.025 37.233, 211.040 32.813 C 211.915 30.891, 211.922 29.723, 211.068 28.126 C 209.156 24.554, 203.559 25.526, 198.114 30.375 L 195.729 32.500 196.895 30.259 C 197.536 29.027, 200.409 26.264, 203.280 24.121 C 216.111 14.539, 221.813 4.111, 215.941 0.968 C 213.274 -0.459, 210.149 1.144, 204.846 6.660 C 199.478 12.243, 192.887 22.246, 187.488 33 C 182.206 43.522, 175.264 51.597, 173.239 49.573 C 172.979 49.312, 174.869 45.208, 177.440 40.453 C 182.506 31.083, 182.834 28.213, 179.052 26.334 C 176.667 25.149, 176.527 25.300, 173.666 32.153 C 168.157 45.350, 156.017 54.774, 155.204 46.485 C 154.749 41.844, 159.327 34.397, 167.010 27.285 C 173.994 20.819, 181.535 10.701, 182.634 6.323 C 183.263 3.816, 180.778 0, 178.516 0 C 177.871 0, 175.253 1.384, 172.699 3.076 M 176.334 8.250 C 173.219 11.560, 166.341 21.476, 164.022 26 C 162.809 28.366, 162.913 28.340, 165.957 25.500 C 171.962 19.900, 182.330 5, 180.222 5 C 179.766 5, 178.016 6.462, 176.334 8.250 M 210.831 8.529 C 208.999 10.470, 206.014 14.580, 204.198 17.662 L 200.897 23.265 204 20.653 C 208.398 16.952, 216 7.866, 216 6.310 C 216 4.110, 214.323 4.830, 210.831 8.529 M 239.831 8.529 C 237.999 10.470, 235.014 14.580, 233.198 17.662 L 229.897 23.265 233 20.653 C 237.398 16.952, 245 7.866, 245 6.310 C 245 4.110, 243.323 4.830, 239.831 8.529 M 303.831 8.529 C 301.999 10.470, 299.014 14.580, 297.198 17.662 L 293.897 23.265 297 20.653 C 301.398 16.952, 309 7.866, 309 6.310 C 309 4.110, 307.323 4.830, 303.831 8.529 M 285.853 10.633 L 281.206 12.058 272.103 29.681 C 267.096 39.374, 263 47.911, 263 48.652 C 263 51.258, 267.090 49.958, 271.403 45.983 C 274.157 43.444, 277.696 38.284, 281.023 31.956 C 283.917 26.451, 288.239 19.034, 290.627 15.473 C 294.664 9.453, 294.812 9.007, 292.734 9.104 C 291.505 9.161, 288.409 9.849, 285.853 10.633";

const LIKHITH_HEART1 =
  "M 180.209 13.853 C 179.164 14.513, 179.156 15.554, 180.167 19.334 C 181.602 24.701, 183.412 25.265, 188.750 22.011 C 194.042 18.784, 192.032 14.298, 186.436 16.847 C 185.096 17.458, 184 17.603, 184 17.170 C 184 15.319, 181.438 13.077, 180.209 13.853";

const LIKHITH_HEART2 =
  "M 254.209 13.853 C 253.164 14.513, 253.156 15.554, 254.167 19.334 C 255.602 24.701, 257.412 25.265, 262.750 22.011 C 268.042 18.784, 266.032 14.298, 260.436 16.847 C 259.096 17.458, 258 17.603, 258 17.170 C 258 15.319, 255.438 13.077, 254.209 13.853";

const KAMI_SPINE =
  "M 22 22 C 26 12, 30 2, 33 2 C 34 2, 35 4, 33 9 C 28 20, 14 36, 4 46 C 2 48, 1 52, 4 52 C 8 52, 14 42, 18 34 C 22 28, 28 26, 30 30 C 32 34, 25 38, 20 38 C 15 38, 12 45, 16 50 C 20 54, 26 52, 32 46 C 38 40, 50 30, 56 28 C 48 27, 36 34, 36 42 C 36 50, 44 52, 52 48 C 56 44, 58 38, 58 30 C 58 38, 56 46, 58 51 C 60 54, 64 50, 68 44 C 70 36, 74 28, 77 28 C 80 28, 76 42, 76 51 C 80 40, 86 28, 92 28 C 96 28, 92 42, 92 51 C 96 40, 102 28, 108 28 C 114 28, 110 44, 110 51 C 112 54, 116 48, 120 42 C 120 44, 118 48, 120 51 C 122 53, 126 46, 131 38";

const LIKHITH_SPINE =
  "M 160 26 C 166 14, 172 2, 175 2 C 176 2, 177 4, 175 9 C 168 22, 156 36, 150 46 C 148 50, 152 53, 160 51 C 166 48, 172 40, 176 36 C 174 44, 172 48, 174 51 C 176 53, 182 46, 188 38 C 198 28, 210 12, 216 2 C 218 2, 219 4, 217 9 C 210 22, 198 36, 192 46 C 190 50, 194 53, 200 48 C 204 42, 210 32, 212 30 C 214 34, 208 38, 204 38 C 200 42, 204 50, 210 51 C 214 52, 218 48, 222 42 C 230 28, 240 12, 245 2 C 247 2, 248 4, 246 9 C 238 22, 228 36, 222 46 C 220 50, 224 53, 228 46 C 232 38, 238 28, 242 28 C 246 28, 244 42, 244 51 C 246 54, 250 48, 254 42 C 254 44, 252 48, 254 51 C 256 53, 262 46, 268 38 C 272 26, 280 14, 286 8 C 288 8, 288 12, 284 20 C 278 34, 270 44, 266 48 C 264 52, 268 53, 274 50 C 278 46, 284 38, 288 34 C 290 30, 292 26, 294 20 C 298 14, 306 2, 308 2 C 310 2, 311 4, 308 9 C 300 22, 292 36, 288 46 C 286 50, 290 53, 296 46 C 300 38, 304 28, 308 28 C 312 28, 310 42, 308 51 C 310 53, 312 48, 314 36";

const LIKHITH_CROSSBAR = "M 264 15 L 294 15";

// Palette choices for authentic fountain pen inks
const INK_PALETTES = [
  { id: 'amber', name: 'Signature Amber', hex: '#E67E22', glow: 'rgba(230, 126, 34, 0.4)' },
  { id: 'blue', name: 'Royal Pilot Blue', hex: '#2563EB', glow: 'rgba(37, 99, 235, 0.4)' },
  { id: 'black', name: 'Obsidian Carbon', hex: '#18181B', glow: 'rgba(24, 24, 27, 0.4)' },
  { id: 'emerald', name: 'Emerald Forest', hex: '#059669', glow: 'rgba(5, 150, 105, 0.4)' },
  { id: 'crimson', name: 'Velvet Crimson', hex: '#E11D48', glow: 'rgba(225, 29, 72, 0.4)' },
];

/* ─── Vector Fountain Pen Nib Component ─── */
function SvgFountainPenNib({ scale = 1, angle = -38, isHovered = false }) {
  return (
    <g
      transform={`rotate(${angle}) scale(${scale})`}
      className="filter drop-shadow-[2px_6px_8px_rgba(0,0,0,0.45)] pointer-events-none select-none"
    >
      <defs>
        {/* 18k Two-Tone Gold Gradient */}
        <linearGradient id="nibGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="85%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Polished Rhodium/Platinum Inlay */}
        <linearGradient id="nibSilverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="40%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Matte Charcoal Grip Section */}
        <linearGradient id="penGripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="35%" stopColor="#334155" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* 1. Fountain Pen Barrel & Section (Extending Upward) */}
      <path
        d="M -7 -45 L -8 -110 L 8 -110 L 7 -45 Z"
        fill="url(#penGripGrad)"
        stroke="#0F172A"
        strokeWidth="0.8"
      />
      {/* Gold Ring Trim at section */}
      <rect x="-7.5" y="-52" width="15" height="4.5" rx="1" fill="url(#nibGoldGrad)" />
      <rect x="-7" y="-76" width="14" height="2" fill="url(#nibGoldGrad)" opacity="0.85" />

      {/* 2. Main 18K Gold Nib Body (Tip at coordinate 0, 0) */}
      <path
        d="M 0 0
           C -2.4 -8, -5.2 -16, -6.8 -24
           C -7.6 -28, -6.2 -36, -5.8 -45
           L 5.8 -45
           C 6.2 -36, 7.6 -28, 6.8 -24
           C 5.2 -16, 2.4 -8, 0 0 Z"
        fill="url(#nibGoldGrad)"
        stroke="#92400E"
        strokeWidth="0.4"
      />

      {/* 3. Rhodium Center Wings Inlay */}
      <path
        d="M 0 -2
           C -1.5 -8, -3.4 -15, -4.2 -22
           C -4.8 -26, -3.8 -34, -3.5 -42
           L 3.5 -42
           C 3.8 -34, 4.8 -26, 4.2 -22
           C 3.4 -15, 1.5 -8, 0 -2 Z"
        fill="url(#nibSilverGrad)"
        opacity="0.92"
      />

      {/* 4. Nib Breather Hole & Center Ink Slit */}
      {/* Center Slit */}
      <line x1="0" y1="0" x2="0" y2="-21" stroke="#0F172A" strokeWidth="0.75" strokeLinecap="round" />
      {/* Heart-Shaped Breather Hole */}
      <circle cx="0" cy="-21.5" r="1.6" fill="#0F172A" />

      {/* 5. Classical Scrollwork Engravings on Nib */}
      <path
        d="M -3 -25 C -2.5 -29, -1.2 -32, 0 -32 C 1.2 -32, 2.5 -29, 3 -25"
        fill="none"
        stroke="#D97706"
        strokeWidth="0.5"
      />
      <text
        x="0"
        y="-34"
        textAnchor="middle"
        fontSize="3.8"
        fontWeight="bold"
        fill="#92400E"
        fontFamily="serif"
        letterSpacing="0.4"
      >
        18K
      </text>
      <text
        x="0"
        y="-27"
        textAnchor="middle"
        fontSize="2.4"
        fill="#B45309"
        fontFamily="sans-serif"
        fontWeight="800"
      >
        M
      </text>

      {/* 6. Liquid Ink Gleam on Nib Tip */}
      <circle cx="0" cy="-0.5" r="0.9" fill="#FFFFFF" opacity="0.8" />
    </g>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN FOUNTAIN PEN SIGNATURE & GUESTBOOK COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function FountainPenSignature({ isOpen, onClose, defaultTab = 'author' }) {
  const [activeTab, setActiveTab] = useState(defaultTab); // 'author' | 'visitor'
  const [selectedInk, setSelectedInk] = useState(INK_PALETTES[0]);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 0.75 (slow), 1 (normal), 1.5 (fast)
  
  // Animation state for Author's Signature
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFinishedOnce, setHasFinishedOnce] = useState(false);
  const [penCoords, setPenCoords] = useState({ x: 22, y: 22, angle: -38, isVisible: true, isLifting: false });
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);

  // Visitor Guestbook Canvas states
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [visitorName, setVisitorName] = useState('');
  const [sealedToast, setSealedToast] = useState(false);
  const [visitorPenPos, setVisitorPenPos] = useState(null);
  const [visitorHistoryCount, setVisitorHistoryCount] = useState(0);

  // Hidden path refs to compute points in viewBox
  const kamiSpineRef = useRef(null);
  const kamiHeartRef = useRef(null);
  const likhithSpineRef = useRef(null);
  const likhithHeart1Ref = useRef(null);
  const likhithHeart2Ref = useRef(null);
  const likhithCrossbarRef = useRef(null);
  const animFrameRef = useRef(null);

  // Close on Escape key if used as modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Load visitor history count from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('portfolio_guestbook_signatures') || '[]');
      setVisitorHistoryCount(saved.length);
    } catch {
      // ignore
    }
  }, [sealedToast]);

  /* ──────────────────────────────────────────────────────────────
     AUTHOR SIGNATURE TIMED ORCHESTRATION WITH PEN-NIB TRACKING
     ────────────────────────────────────────────────────────────── */
  const runAuthorAnimation = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(true);
    setAnimProgress(0);
    sound.click();

    const baseDuration = 3400 / speedMultiplier;
    const startTime = performance.now();

    const segments = [
      // 1. "kami" main stroke
      { name: 'kami', ref: kamiSpineRef, startPct: 0.04, endPct: 0.38, liftAfter: true },
      // 2. dot on 'i' of kami (heart)
      { name: 'kamiHeart', ref: kamiHeartRef, startPct: 0.40, endPct: 0.46, liftAfter: true },
      // 3. "likhith" main stroke
      { name: 'likhith', ref: likhithSpineRef, startPct: 0.48, endPct: 0.82, liftAfter: true },
      // 4. first 'i' dot of likhith
      { name: 'likhithHeart1', ref: likhithHeart1Ref, startPct: 0.84, endPct: 0.88, liftAfter: true },
      // 5. second 'i' dot of likhith
      { name: 'likhithHeart2', ref: likhithHeart2Ref, startPct: 0.89, endPct: 0.93, liftAfter: true },
      // 6. crossbar of 't'
      { name: 'crossbar', ref: likhithCrossbarRef, startPct: 0.94, endPct: 0.99, liftAfter: false },
    ];

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / baseDuration);
      setAnimProgress(progress);

      // Locate current active segment
      let foundSegment = false;
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        if (progress >= seg.startPct && progress <= seg.endPct) {
          foundSegment = true;
          setActiveSegmentIndex(i);
          const pathEl = seg.ref.current;
          if (pathEl) {
            const totalLen = pathEl.getTotalLength();
            const localProgress = (progress - seg.startPct) / (seg.endPct - seg.startPct);
            const currentDist = localProgress * totalLen;
            const pt = pathEl.getPointAtLength(currentDist);
            const ptAhead = pathEl.getPointAtLength(Math.min(totalLen, currentDist + 2));

            // Dynamic tangent tilt
            const dx = ptAhead.x - pt.x;
            const dy = ptAhead.y - pt.y;
            const tangent = Math.atan2(dy, dx) * (180 / Math.PI);
            const naturalHandTilt = -38 + Math.max(-10, Math.min(10, (dx - dy) * 2));

            setPenCoords({
              x: pt.x,
              y: pt.y,
              angle: naturalHandTilt,
              isVisible: true,
              isLifting: false,
            });
          }
          break;
        }
      }

      // If transitioning between strokes, simulate pen lifting into the air
      if (!foundSegment) {
        if (progress < 0.04) {
          setPenCoords((prev) => ({ ...prev, x: 22, y: 16, angle: -38, isVisible: true, isLifting: true }));
        } else if (progress > 0.99) {
          setPenCoords((prev) => ({ ...prev, x: 314, y: 12, angle: -32, isVisible: true, isLifting: true }));
        } else {
          setPenCoords((prev) => ({ ...prev, isLifting: true }));
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(frame);
      } else {
        setIsPlaying(false);
        setHasFinishedOnce(true);
        sound.pop();
      }
    };

    animFrameRef.current = requestAnimationFrame(frame);
  }, [speedMultiplier]);

  // Initial trigger on mount or tab select
  useEffect(() => {
    if (activeTab === 'author') {
      const timer = setTimeout(() => {
        runAuthorAnimation();
      }, 350);
      return () => {
        clearTimeout(timer);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }
  }, [activeTab, runAuthorAnimation]);

  /* ──────────────────────────────────────────────────────────────
     VISITOR GUESTBOOK CANVAS ENGINE (PRESSURE-SENSITIVE BEZIER)
     ────────────────────────────────────────────────────────────── */
  // Redraw complete stroke buffer
  const redrawStrokes = useCallback((allStrokes) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);

    allStrokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      for (let i = 1; i < stroke.points.length; i++) {
        const p1 = stroke.points[i - 1];
        const p2 = stroke.points[i];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        // Dynamic pressure-simulated line width based on movement speed
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const width = Math.max(1.8, Math.min(4.8, 5.2 - dist * 0.16));
        ctx.lineWidth = width;

        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      }
      ctx.stroke();
    });
  }, []);

  // Canvas initialization with High-DPI support
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial clear & background
    redrawStrokes(strokes);
  }, [strokes, redrawStrokes]);

  useEffect(() => {
    if (activeTab === 'visitor') {
      const timer = setTimeout(initCanvas, 100);
      window.addEventListener('resize', initCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', initCanvas);
      };
    }
  }, [activeTab, initCanvas]);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentStroke([{ x, y, time: Date.now() }]);
    setVisitorPenPos({ x, y });
    canvas.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setVisitorPenPos({ x, y });

    if (!isDrawing) return;

    const newPoint = { x, y, time: Date.now() };
    const updated = [...currentStroke, newPoint];
    setCurrentStroke(updated);

    const ctx = canvas.getContext('2d');
    if (updated.length >= 2) {
      const p1 = updated[updated.length - 2];
      const p2 = updated[updated.length - 1];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const width = Math.max(1.8, Math.min(4.8, 5.2 - dist * 0.16));

      ctx.beginPath();
      ctx.strokeStyle = selectedInk.hex;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      ctx.stroke();
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      const newStrokes = [...strokes, { points: currentStroke, color: selectedInk.hex }];
      setStrokes(newStrokes);
    }
    setCurrentStroke([]);
  };

  const handleClearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
    sound.pop();
  };

  const handleUndoStroke = () => {
    if (strokes.length === 0) return;
    const nextStrokes = strokes.slice(0, -1);
    setStrokes(nextStrokes);
    redrawStrokes(nextStrokes);
    sound.click();
  };

  // Download authenticated calligraphy certificate PNG
  const handleDownloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokes.length === 0) return;

    // Generate high-resolution export canvas with parchment frame
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1200;
    exportCanvas.height = 700;
    const eCtx = exportCanvas.getContext('2d');

    // Parchment paper gradient
    const paperGrad = eCtx.createLinearGradient(0, 0, 1200, 700);
    paperGrad.addColorStop(0, '#FAF8F5');
    paperGrad.addColorStop(1, '#F3EFEA');
    eCtx.fillStyle = paperGrad;
    eCtx.fillRect(0, 0, 1200, 700);

    // Subtle paper grain vignette
    eCtx.strokeStyle = '#E67E22';
    eCtx.lineWidth = 4;
    eCtx.strokeRect(30, 30, 1140, 640);
    eCtx.strokeStyle = 'rgba(230, 126, 34, 0.35)';
    eCtx.lineWidth = 1.5;
    eCtx.strokeRect(38, 38, 1124, 624);

    // Certificate Header
    eCtx.fillStyle = '#18181B';
    eCtx.font = 'bold 28px serif';
    eCtx.textAlign = 'center';
    eCtx.fillText('KAMI LIKHITH • PORTFOLIO GUESTBOOK', 600, 95);

    eCtx.fillStyle = '#71717A';
    eCtx.font = '600 13px sans-serif';
    eCtx.letterSpacing = '2px';
    eCtx.fillText('OFFICIAL VISITOR CALLIGRAPHY CERTIFICATE', 600, 125);

    // Draw the visitor signature from main canvas into center
    eCtx.drawImage(canvas, 100, 160, 1000, 380);

    // Footer signature verification & timestamp
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    eCtx.fillStyle = '#52525B';
    eCtx.font = '14px monospace';
    eCtx.fillText(`Signed by: ${visitorName.trim() || 'Distinguished Guest'}`, 600, 580);
    eCtx.fillText(`Timestamp: ${dateStr} • Authenticated Session`, 600, 605);

    // Golden Wax Seal Graphic
    eCtx.beginPath();
    eCtx.arc(1060, 570, 38, 0, Math.PI * 2);
    eCtx.fillStyle = '#E67E22';
    eCtx.fill();
    eCtx.fillStyle = '#FFFFFF';
    eCtx.font = 'bold 11px sans-serif';
    eCtx.fillText('VERIFIED', 1060, 568);
    eCtx.fillText('VISITOR', 1060, 582);

    // Download trigger
    const link = document.createElement('a');
    link.download = `Kami_Likhith_Guestbook_Signature_${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
    sound.success();
  };

  // Seal in guestbook local storage + trigger confetti
  const handleSealGuestbook = () => {
    if (strokes.length === 0) return;
    const name = visitorName.trim() || 'Visitor';
    const record = {
      id: Date.now(),
      name,
      ink: selectedInk.name,
      hex: selectedInk.hex,
      date: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('portfolio_guestbook_signatures') || '[]');
      existing.unshift(record);
      localStorage.setItem('portfolio_guestbook_signatures', JSON.stringify(existing.slice(0, 30)));
    } catch {
      // ignore
    }

    sound.success();
    window.__triggerConfetti?.();
    setSealedToast(true);
    setTimeout(() => setSealedToast(false), 3500);
  };

  /* ──────────────────────────────────────────────────────────────
     CONTENT CONTAINER (Renderable as Modal or Embedded Block)
     ────────────────────────────────────────────────────────────── */
  const innerContent = (
    <div className="relative w-full max-w-4xl bg-white/90 dark:bg-[#121216]/95 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-white/10 shadow-2xl overflow-hidden transition-all duration-300">
      {/* ── Top Header Bar ── */}
      <div className="px-6 py-5 border-b border-zinc-200/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shadow-xs">
            <FaPenNib size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Fountain Pen Studio
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25">
                v2.4
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Calligraphic vector nib mechanics & interactive visitor guestbook
            </p>
          </div>
        </div>

        {/* Studio Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/70 dark:border-white/10 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('author');
              sound.click();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'author'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-black'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <FaFeatherAlt size={12} className={activeTab === 'author' ? 'text-[var(--accent)]' : ''} />
            <span>Author's Seal</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('visitor');
              sound.click();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'visitor'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-black'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <FaStamp size={12} className={activeTab === 'visitor' ? 'text-[var(--accent)]' : ''} />
            <span>Sign Guestbook</span>
            {visitorHistoryCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[9px] font-black flex items-center justify-center">
                {visitorHistoryCount}
              </span>
            )}
          </button>
        </div>

        {/* Modal Close Button if opened in overlay */}
        {onClose && (
          <button
            onClick={onClose}
            className="hidden sm:flex w-9 h-9 rounded-full border border-zinc-200 dark:border-white/10 items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            aria-label="Close studio"
          >
            <FaTimes size={14} />
          </button>
        )}
      </div>

      {/* ── Tab 1: Author's Live Signature with Vector Fountain Pen Nib ── */}
      {activeTab === 'author' && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Parchment Signature Stage */}
          <div className="relative w-full aspect-[21/9] min-h-[220px] sm:min-h-[260px] rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0E0E12] shadow-inner overflow-hidden flex items-center justify-center p-4 sm:p-8 select-none">
            {/* Fine ruling lines for calligraphy paper */}
            <div
              className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, #000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Subtle watermark seal */}
            <div className="absolute right-6 bottom-4 pointer-events-none flex items-center gap-2 opacity-25 dark:opacity-20 font-mono text-[10px] tracking-widest uppercase">
              <FaAward size={14} />
              <span>Verified Cryptographic Signature • Kami Likhith</span>
            </div>

            {/* Hidden Reference Path Elements for getPointAtLength math */}
            <svg className="absolute w-0 h-0 overflow-hidden" viewBox="0 0 313 55">
              <path ref={kamiSpineRef} d={KAMI_SPINE} />
              <path ref={kamiHeartRef} d={KAMI_HEART} />
              <path ref={likhithSpineRef} d={LIKHITH_SPINE} />
              <path ref={likhithHeart1Ref} d={LIKHITH_HEART1} />
              <path ref={likhithHeart2Ref} d={LIKHITH_HEART2} />
              <path ref={likhithCrossbarRef} d={LIKHITH_CROSSBAR} />
            </svg>

            {/* Live Master SVG with Ink Flow + Gliding Fountain Pen Nib */}
            <svg
              className="w-full h-auto max-h-[170px] overflow-visible"
              viewBox="0 0 320 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="fountainInkSheen" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1.2" stdDeviation="1.5" floodColor={selectedInk.hex} floodOpacity="0.28" />
                </filter>
              </defs>

              {/* 1. Revealed Artwork Paths (Kami Likhith Calligraphy) */}
              <g style={{ filter: 'url(#fountainInkSheen)' }}>
                {/* Kami Body */}
                <path
                  d={KAMI_BODY}
                  fill={selectedInk.hex}
                  opacity={animProgress >= 0.04 ? 1 : 0}
                  className="transition-opacity duration-300"
                />

                {/* Kami Heart Dot */}
                <path
                  d={KAMI_HEART}
                  fill={selectedInk.hex}
                  opacity={animProgress >= 0.40 ? 1 : 0}
                  className="transition-opacity duration-200"
                />

                {/* Likhith Body */}
                <path
                  d={LIKHITH_BODY}
                  fill={selectedInk.hex}
                  opacity={animProgress >= 0.48 ? 1 : 0}
                  className="transition-opacity duration-300"
                />

                {/* Likhith Hearts */}
                <path
                  d={LIKHITH_HEART1}
                  fill={selectedInk.hex}
                  opacity={animProgress >= 0.84 ? 1 : 0}
                  className="transition-opacity duration-200"
                />
                <path
                  d={LIKHITH_HEART2}
                  fill={selectedInk.hex}
                  opacity={animProgress >= 0.89 ? 1 : 0}
                  className="transition-opacity duration-200"
                />

                {/* Likhith Crossbar */}
                <path
                  d={LIKHITH_CROSSBAR}
                  stroke={selectedInk.hex}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  opacity={animProgress >= 0.94 ? 1 : 0}
                />
              </g>

              {/* 2. Vector Fountain Pen Nib Gliding Along Coordinates */}
              {isPlaying && penCoords.isVisible && (
                <g
                  transform={`translate(${penCoords.x}, ${penCoords.y})`}
                  className="transition-transform duration-75 ease-out"
                >
                  <SvgFountainPenNib
                    scale={0.42}
                    angle={penCoords.angle}
                    isHovered={penCoords.isLifting}
                  />

                  {/* Micro-Ink Droplet Sparkle on paper contact */}
                  {!penCoords.isLifting && (
                    <circle
                      cx="0"
                      cy="0"
                      r="1.2"
                      fill={selectedInk.hex}
                      className="animate-ping"
                      style={{ transformOrigin: 'center' }}
                    />
                  )}
                </g>
              )}
            </svg>

            {/* Authenticated Author Badge when playback completes */}
            {hasFinishedOnce && !isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold"
              >
                <FaCheck size={11} />
                <span>Digitally Signed</span>
              </motion.div>
            )}
          </div>

          {/* Controls & Palette Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {/* Ink Palette Picker */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <FaPalette size={12} />
                <span>Ink:</span>
              </span>
              <div className="flex items-center gap-2">
                {INK_PALETTES.map((ink) => (
                  <button
                    key={ink.id}
                    onClick={() => {
                      setSelectedInk(ink);
                      sound.pop();
                    }}
                    title={ink.name}
                    className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center ${
                      selectedInk.id === ink.id ? 'ring-2 ring-offset-2 ring-zinc-900 dark:ring-white scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: ink.hex }}
                  >
                    {selectedInk.id === ink.id && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Speed Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/70 dark:border-white/10 text-xs font-mono font-bold">
              {[
                { label: '0.75x', val: 0.75 },
                { label: '1.0x', val: 1 },
                { label: '1.5x', val: 1.5 },
              ].map((sp) => (
                <button
                  key={sp.label}
                  onClick={() => {
                    setSpeedMultiplier(sp.val);
                    sound.click();
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    speedMultiplier === sp.val
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>

            {/* Replay Button */}
            <button
              onClick={runAuthorAnimation}
              disabled={isPlaying}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[var(--accent)] hover:brightness-110 active:scale-95 transition-all shadow-md disabled:opacity-50"
            >
              {isPlaying ? <FaPlay className="animate-pulse" size={11} /> : <FaRedo size={11} />}
              <span>{isPlaying ? 'Writing...' : 'Replay Signature'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Tab 2: Interactive Visitor Calligraphy Guestbook Canvas ── */}
      {activeTab === 'visitor' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Leave Your Mark in the Guestbook
              </h4>
              <p className="text-xs text-zinc-500 font-medium">
                Draw your signature below using mouse, trackpad, or finger/stylus on touch screens.
              </p>
            </div>

            {/* Visitor Name Input */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Your Name / Title..."
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          {/* Interactive Drawing Canvas */}
          <div className="relative w-full h-[240px] sm:h-[280px] rounded-2xl border-2 border-dashed border-zinc-300 dark:border-white/20 bg-[#FAF8F5] dark:bg-[#0E0E12] shadow-inner overflow-hidden cursor-crosshair touch-none select-none">
            {/* Guide grid line */}
            <div className="absolute inset-x-8 top-1/2 border-b border-zinc-300/40 dark:border-white/10 pointer-events-none" />
            <div className="absolute bottom-4 left-6 pointer-events-none text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
              X ______________________________________ (Sign Here)
            </div>

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />

            {/* Live Virtual Fountain Pen Following Cursor in Canvas */}
            {visitorPenPos && isDrawing && (
              <div
                className="absolute pointer-events-none transition-transform duration-75"
                style={{
                  left: `${visitorPenPos.x}px`,
                  top: `${visitorPenPos.y}px`,
                  transform: 'translate(-5px, -8px)',
                }}
              >
                <svg width="45" height="60" viewBox="0 0 50 70" className="overflow-visible">
                  <SvgFountainPenNib scale={0.42} angle={-38} />
                </svg>
              </div>
            )}
          </div>

          {/* Toolbar: Undo, Clear, Palette, Download, Seal */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Color Palette for visitor */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Ink:</span>
              <div className="flex items-center gap-1.5">
                {INK_PALETTES.map((ink) => (
                  <button
                    key={ink.id}
                    onClick={() => {
                      setSelectedInk(ink);
                      sound.pop();
                    }}
                    title={ink.name}
                    className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                      selectedInk.id === ink.id ? 'ring-2 ring-offset-2 ring-zinc-900 dark:ring-white scale-110' : ''
                    }`}
                    style={{ backgroundColor: ink.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndoStroke}
                disabled={strokes.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40 transition-all"
                title="Undo last stroke"
              >
                <FaUndo size={11} />
                <span>Undo</span>
              </button>

              <button
                onClick={handleClearCanvas}
                disabled={strokes.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20 hover:bg-rose-50 dark:hover:bg-rose-500/10 disabled:opacity-40 transition-all"
                title="Clear signature canvas"
              >
                <FaEraser size={11} />
                <span>Clear</span>
              </button>

              <button
                onClick={handleDownloadCertificate}
                disabled={strokes.length === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/20 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all disabled:opacity-40 shadow-xs"
                title="Download verified PNG certificate"
              >
                <FaDownload size={11} />
                <span>Save Certificate</span>
              </button>

              <button
                onClick={handleSealGuestbook}
                disabled={strokes.length === 0}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[var(--accent)] hover:brightness-110 active:scale-95 transition-all shadow-md disabled:opacity-40"
              >
                <FaStamp size={12} />
                <span>Seal in Guestbook</span>
              </button>
            </div>
          </div>

          {/* Success Toast Notification */}
          <AnimatePresence>
            {sealedToast && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-700 dark:text-emerald-300 text-xs font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">
                    ✓
                  </span>
                  <div>
                    <p className="font-black text-sm">Signature Sealed & Recorded!</p>
                    <p className="font-normal text-[11px] opacity-80">
                      Thank you for visiting! Your signature is stored in the local guestbook ledger.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadCertificate}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all"
                >
                  Download PNG
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );

  // If component is wrapped as an open modal
  if (isOpen !== undefined) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99990] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl my-auto"
            >
              {innerContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Otherwise, return as standard inline component
  return innerContent;
}

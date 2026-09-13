/**
 * MeowDoku puzzle data (5x5).
 * regions[row][col] = region id (int). solution = the one cat cell per row.
 */
window.MEOWDOKU_PUZZLES = [
  {
    id: 1,
    title: "Level 01",
    size: 5,
    regions: [
      [1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 2, 0, 0],
      [1, 1, 4, 3, 3],
      [4, 4, 4, 3, 3]
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 0 },
      { row: 2, col: 2 },
      { row: 3, col: 4 },
      { row: 4, col: 1 }
    ]
  },
  {
    id: 2,
    title: "Level 02",
    size: 5,
    regions: [
      [1, 1, 0, 0, 0],
      [1, 1, 1, 2, 0],
      [1, 3, 3, 2, 2],
      [1, 3, 2, 2, 2],
      [3, 3, 3, 2, 4]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 3 },
      { row: 3, col: 1 },
      { row: 4, col: 4 }
    ]
  },
  {
    id: 3,
    title: "Level 03",
    size: 5,
    regions: [
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 2],
      [1, 3, 3, 2, 2],
      [3, 3, 3, 2, 2],
      [3, 3, 3, 4, 2]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 4 },
      { row: 3, col: 1 },
      { row: 4, col: 3 }
    ]
  },
  {
    id: 4,
    title: "Level 04",
    size: 5,
    regions: [
      [2, 4, 0, 0, 0],
      [2, 4, 0, 1, 1],
      [2, 4, 3, 3, 3],
      [4, 4, 3, 3, 3],
      [4, 4, 3, 3, 3]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 4 },
      { row: 2, col: 0 },
      { row: 3, col: 3 },
      { row: 4, col: 1 }
    ]
  },
  {
    id: 5,
    title: "Level 05",
    size: 5,
    regions: [
      [0, 0, 0, 0, 0],
      [2, 0, 0, 0, 1],
      [2, 2, 2, 1, 1],
      [2, 2, 3, 3, 3],
      [4, 3, 3, 3, 3]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 4 },
      { row: 2, col: 1 },
      { row: 3, col: 3 },
      { row: 4, col: 0 }
    ]
  },
  {
    id: 6,
    title: "Level 06",
    size: 5,
    regions: [
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [2, 3, 3, 3, 1],
      [4, 4, 3, 3, 3],
      [4, 4, 4, 3, 3]
    ],
    solution: [
      { row: 0, col: 4 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 3, col: 3 },
      { row: 4, col: 1 }
    ]
  },
  {
    id: 7,
    title: "Level 07",
    size: 5,
    regions: [
      [1, 0, 0, 0, 0],
      [1, 3, 2, 2, 2],
      [3, 3, 3, 2, 4],
      [3, 3, 3, 2, 4],
      [3, 3, 3, 3, 4]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 3 },
      { row: 3, col: 1 },
      { row: 4, col: 4 }
    ]
  },
  {
    id: 8,
    title: "Level 08",
    size: 5,
    regions: [
      [0, 0, 0, 0, 0],
      [0, 0, 3, 0, 1],
      [4, 2, 3, 0, 0],
      [4, 2, 3, 3, 3],
      [4, 4, 4, 3, 3]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 4 },
      { row: 2, col: 1 },
      { row: 3, col: 3 },
      { row: 4, col: 0 }
    ]
  },
  {
    id: 9,
    title: "Level 09",
    size: 5,
    regions: [
      [1, 1, 1, 2, 0],
      [1, 1, 2, 2, 2],
      [1, 3, 2, 2, 2],
      [3, 3, 3, 2, 2],
      [3, 3, 4, 4, 4]
    ],
    solution: [
      { row: 0, col: 4 },
      { row: 1, col: 1 },
      { row: 2, col: 3 },
      { row: 3, col: 0 },
      { row: 4, col: 2 }
    ]
  },
  {
    id: 10,
    title: "Level 10",
    size: 5,
    regions: [
      [3, 1, 1, 0, 2],
      [3, 1, 1, 2, 2],
      [3, 3, 1, 2, 2],
      [3, 3, 2, 2, 2],
      [3, 3, 4, 2, 2]
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 1 },
      { row: 2, col: 4 },
      { row: 3, col: 0 },
      { row: 4, col: 2 }
    ]
  },
  {
    id: 11,
    title: "Level 11",
    size: 5,
    regions: [
      [3, 0, 0, 0, 2],
      [3, 1, 0, 2, 2],
      [3, 3, 0, 2, 2],
      [3, 3, 3, 2, 4],
      [3, 3, 4, 4, 4]
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 1 },
      { row: 2, col: 4 },
      { row: 3, col: 0 },
      { row: 4, col: 2 }
    ]
  },
  {
    id: 12,
    title: "Level 12",
    size: 5,
    regions: [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [3, 3, 3, 2, 2],
      [3, 3, 3, 2, 2],
      [3, 3, 3, 2, 4]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 3 },
      { row: 3, col: 1 },
      { row: 4, col: 4 }
    ]
  },
  {
    id: 13,
    title: "Level 13",
    size: 5,
    regions: [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1],
      [2, 0, 0, 4, 1],
      [4, 4, 4, 4, 3],
      [4, 4, 4, 4, 4]
    ],
    solution: [
      { row: 0, col: 1 },
      { row: 1, col: 3 },
      { row: 2, col: 0 },
      { row: 3, col: 4 },
      { row: 4, col: 2 }
    ]
  },
  {
    id: 14,
    title: "Level 14",
    size: 5,
    regions: [
      [0, 0, 0, 2, 2],
      [1, 1, 2, 2, 2],
      [1, 1, 2, 2, 2],
      [3, 3, 3, 3, 2],
      [3, 3, 4, 4, 2]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 4 },
      { row: 3, col: 1 },
      { row: 4, col: 3 }
    ]
  },
  {
    id: 15,
    title: "Level 15",
    size: 5,
    regions: [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [2, 3, 3, 1, 3],
      [2, 3, 3, 3, 3],
      [2, 3, 3, 3, 4]
    ],
    solution: [
      { row: 0, col: 1 },
      { row: 1, col: 3 },
      { row: 2, col: 0 },
      { row: 3, col: 2 },
      { row: 4, col: 4 }
    ]
  }
];

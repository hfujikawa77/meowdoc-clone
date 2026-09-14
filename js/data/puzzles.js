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
  },
  {
    id: 16,
    title: "Level 16",
    size: 6,
    regions: [
      [3, 0, 0, 0, 0, 0],
      [3, 1, 0, 0, 2, 2],
      [3, 3, 5, 5, 5, 2],
      [3, 3, 5, 5, 2, 2],
      [5, 5, 5, 5, 4, 2],
      [5, 5, 5, 5, 5, 5]
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 1 },
      { row: 2, col: 5 },
      { row: 3, col: 0 },
      { row: 4, col: 4 },
      { row: 5, col: 2 }
    ]
  },
  {
    id: 17,
    title: "Level 17",
    size: 6,
    regions: [
      [1, 0, 0, 2, 2, 2],
      [1, 0, 0, 2, 2, 2],
      [4, 2, 2, 2, 2, 2],
      [4, 4, 2, 2, 3, 3],
      [4, 4, 2, 2, 5, 5],
      [4, 4, 2, 2, 5, 5]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 3 },
      { row: 3, col: 5 },
      { row: 4, col: 1 },
      { row: 5, col: 4 }
    ]
  },
  {
    id: 18,
    title: "Level 18",
    size: 6,
    regions: [
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 2, 0],
      [3, 3, 3, 3, 2, 0],
      [3, 3, 3, 3, 2, 4],
      [3, 3, 3, 3, 2, 4],
      [5, 3, 3, 3, 3, 4]
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 1 },
      { row: 2, col: 4 },
      { row: 3, col: 2 },
      { row: 4, col: 5 },
      { row: 5, col: 0 }
    ]
  },
  {
    id: 19,
    title: "Level 19",
    size: 6,
    regions: [
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1],
      [2, 2, 1, 3, 1, 1],
      [4, 4, 1, 3, 1, 5],
      [4, 4, 1, 5, 1, 5],
      [4, 4, 4, 5, 5, 5]
    ],
    solution: [
      { row: 0, col: 5 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 3, col: 3 },
      { row: 4, col: 1 },
      { row: 5, col: 4 }
    ]
  },
  {
    id: 20,
    title: "Level 20",
    size: 6,
    regions: [
      [2, 2, 0, 0, 0, 0],
      [2, 2, 1, 0, 0, 3],
      [2, 2, 3, 3, 3, 3],
      [2, 2, 3, 3, 3, 3],
      [2, 2, 3, 3, 3, 4],
      [5, 5, 3, 4, 4, 4]
    ],
    solution: [
      { row: 0, col: 4 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 3, col: 3 },
      { row: 4, col: 5 },
      { row: 5, col: 1 }
    ]
  },
  {
    id: 21,
    title: "Level 21",
    size: 7,
    regions: [
      [0, 0, 0, 1, 1, 1, 1],
      [2, 2, 2, 5, 1, 1, 1],
      [2, 2, 5, 5, 5, 1, 1],
      [3, 3, 3, 5, 5, 5, 1],
      [3, 3, 3, 5, 5, 4, 6],
      [5, 5, 5, 5, 5, 4, 6],
      [5, 5, 5, 5, 5, 5, 6]
    ],
    solution: [
      { row: 0, col: 1 },
      { row: 1, col: 4 },
      { row: 2, col: 0 },
      { row: 3, col: 2 },
      { row: 4, col: 5 },
      { row: 5, col: 3 },
      { row: 6, col: 6 }
    ]
  },
  {
    id: 22,
    title: "Level 22",
    size: 7,
    regions: [
      [3, 0, 0, 0, 1, 1, 1],
      [3, 3, 1, 1, 1, 1, 1],
      [3, 3, 3, 1, 1, 2, 2],
      [3, 3, 3, 3, 3, 4, 4],
      [3, 3, 3, 3, 4, 4, 4],
      [5, 5, 3, 3, 3, 4, 4],
      [5, 6, 6, 3, 3, 4, 4]
    ],
    solution: [
      { row: 0, col: 1 },
      { row: 1, col: 4 },
      { row: 2, col: 6 },
      { row: 3, col: 3 },
      { row: 4, col: 5 },
      { row: 5, col: 0 },
      { row: 6, col: 2 }
    ]
  },
  {
    id: 23,
    title: "Level 23",
    size: 7,
    regions: [
      [0, 0, 0, 0, 1, 1, 1],
      [0, 2, 1, 1, 1, 1, 1],
      [0, 2, 1, 1, 1, 1, 1],
      [0, 2, 5, 3, 1, 1, 6],
      [4, 5, 5, 3, 5, 1, 6],
      [5, 5, 5, 5, 5, 6, 6],
      [5, 5, 5, 5, 6, 6, 6]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 5 },
      { row: 2, col: 1 },
      { row: 3, col: 3 },
      { row: 4, col: 0 },
      { row: 5, col: 4 },
      { row: 6, col: 6 }
    ]
  },
  {
    id: 24,
    title: "Level 24",
    size: 7,
    regions: [
      [2, 2, 0, 0, 1, 1, 1],
      [2, 2, 2, 2, 1, 1, 1],
      [2, 2, 2, 2, 1, 1, 3],
      [2, 2, 2, 4, 4, 3, 3],
      [2, 2, 2, 4, 4, 4, 4],
      [6, 2, 5, 6, 4, 4, 4],
      [6, 6, 6, 6, 4, 4, 4]
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 5 },
      { row: 2, col: 1 },
      { row: 3, col: 6 },
      { row: 4, col: 4 },
      { row: 5, col: 2 },
      { row: 6, col: 0 }
    ]
  },
  {
    id: 25,
    title: "Level 25",
    size: 7,
    regions: [
      [1, 1, 0, 0, 2, 2, 2],
      [1, 1, 1, 4, 4, 2, 2],
      [1, 1, 1, 4, 2, 2, 2],
      [4, 3, 4, 4, 2, 2, 5],
      [4, 4, 4, 4, 4, 4, 5],
      [4, 4, 4, 4, 4, 4, 5],
      [4, 4, 4, 6, 4, 4, 5]
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 5 },
      { row: 3, col: 1 },
      { row: 4, col: 4 },
      { row: 5, col: 6 },
      { row: 6, col: 3 }
    ]
  },
  {
    id: 26,
    title: "Level 26",
    size: 8,
    regions: [
      [1, 1, 0, 0, 3, 3, 3, 3],
      [1, 1, 2, 0, 3, 3, 3, 3],
      [1, 1, 2, 0, 3, 3, 3, 3],
      [4, 4, 4, 4, 4, 3, 3, 6],
      [4, 4, 4, 4, 4, 3, 3, 6],
      [4, 4, 4, 4, 5, 7, 6, 6],
      [4, 4, 4, 4, 7, 7, 6, 6],
      [4, 4, 4, 4, 7, 7, 6, 6]
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 0 },
      { row: 2, col: 2 },
      { row: 3, col: 6 },
      { row: 4, col: 1 },
      { row: 5, col: 4 },
      { row: 6, col: 7 },
      { row: 7, col: 5 }
    ]
  },
  {
    id: 27,
    title: "Level 27",
    size: 8,
    regions: [
      [2, 0, 1, 1, 1, 1, 1, 1],
      [2, 2, 2, 1, 1, 1, 1, 1],
      [2, 2, 5, 3, 3, 1, 1, 1],
      [2, 2, 5, 3, 3, 3, 3, 3],
      [2, 5, 5, 5, 4, 5, 5, 3],
      [5, 5, 5, 5, 5, 5, 6, 3],
      [5, 5, 5, 5, 5, 5, 6, 3],
      [5, 5, 7, 7, 7, 6, 6, 6]
    ],
    solution: [
      { row: 0, col: 1 },
      { row: 1, col: 5 },
      { row: 2, col: 0 },
      { row: 3, col: 7 },
      { row: 4, col: 4 },
      { row: 5, col: 2 },
      { row: 6, col: 6 },
      { row: 7, col: 3 }
    ]
  },
  {
    id: 28,
    title: "Level 28",
    size: 8,
    regions: [
      [1, 1, 1, 1, 2, 2, 0, 2],
      [1, 1, 1, 1, 2, 2, 2, 2],
      [5, 1, 1, 1, 2, 2, 2, 2],
      [5, 3, 4, 4, 4, 2, 2, 2],
      [5, 5, 4, 4, 4, 4, 2, 2],
      [5, 5, 4, 4, 4, 4, 4, 2],
      [4, 4, 4, 4, 4, 6, 7, 7],
      [4, 4, 4, 4, 4, 7, 7, 7]
    ],
    solution: [
      { row: 0, col: 6 },
      { row: 1, col: 2 },
      { row: 2, col: 4 },
      { row: 3, col: 1 },
      { row: 4, col: 3 },
      { row: 5, col: 0 },
      { row: 6, col: 5 },
      { row: 7, col: 7 }
    ]
  },
  {
    id: 29,
    title: "Level 29",
    size: 8,
    regions: [
      [2, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 1, 3, 3, 0, 0, 0],
      [2, 2, 2, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 4],
      [6, 6, 3, 5, 3, 3, 3, 4],
      [6, 6, 6, 7, 7, 4, 4, 4],
      [6, 6, 7, 7, 7, 4, 4, 4]
    ],
    solution: [
      { row: 0, col: 6 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 3, col: 5 },
      { row: 4, col: 7 },
      { row: 5, col: 3 },
      { row: 6, col: 1 },
      { row: 7, col: 4 }
    ]
  },
  {
    id: 30,
    title: "Level 30",
    size: 8,
    regions: [
      [2, 0, 2, 2, 1, 1, 1, 1],
      [2, 2, 2, 2, 1, 1, 1, 1],
      [2, 2, 2, 2, 1, 1, 1, 1],
      [3, 2, 2, 2, 1, 1, 1, 1],
      [3, 2, 2, 4, 6, 1, 1, 1],
      [3, 3, 6, 6, 6, 5, 5, 5],
      [3, 3, 7, 7, 6, 6, 6, 5],
      [3, 3, 7, 7, 7, 7, 7, 5]
    ],
    solution: [
      { row: 0, col: 1 },
      { row: 1, col: 5 },
      { row: 2, col: 2 },
      { row: 3, col: 0 },
      { row: 4, col: 3 },
      { row: 5, col: 7 },
      { row: 6, col: 4 },
      { row: 7, col: 6 }
    ]
  }
];

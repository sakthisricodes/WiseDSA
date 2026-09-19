const fs = require('fs');
const path = require('path');

// Raw parsed data strictly from the OCR of the 5 pages
const rawEntries = [
  // === PAGE 1: ARRAYS ===
  { topic: "Arrays", title: "Maximum and Minimum Element in an Array", companies: "ABCO Accolite Amazon Cisco Hike Microsoft Snapdeal VMWare Google Adobe", remarks: "" },
  { topic: "Arrays", title: "Reverse the Array", companies: "Infosys Moonfrog Labs", remarks: "" },
  { topic: "Arrays", title: "Maximum-Subarray", companies: "Microsoft + Facebook Interview Qs", remarks: "Interview Qs use Kadane's Algorithm" },
  { topic: "Arrays", title: "Contains Duplicate", companies: "Amazon Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Chocolate Distribution Problem", companies: "Amazon Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Search in Rotated Sorted Array", companies: "Microsoft Google Adobe Amazon D-E-Shaw Flipkart Hike Intuit MakeMyTrip Paytm", remarks: "" },
  { topic: "Arrays", title: "Next Permutation", companies: "Uber + Goldman Sachs + Adobe Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Best time to Buy and Sell Stock", companies: "Amazon D-E-Shaw Directi Flipkart Goldman Sachs Intuit MakeMyTrip Microsoft Ola Cabs Oracle Paytm Pubmatic Quikr Salesforce Sapient Swiggy Walmart Media.net Google", remarks: "" },
  { topic: "Arrays", title: "Repeat and Missing Number Array", companies: "Amazon Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Kth-Largest Element in an Array", companies: "Amazon Microsoft Walmart Adobe", remarks: "" },
  { topic: "Arrays", title: "Trapping Rain Water", companies: "Samsung Interview Qs", remarks: "use auxiliary arrays" },
  { topic: "Arrays", title: "Product of Array Except Self", companies: "Microsoft + Facebook Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Maximum Product Subarray", companies: "Amazon D-E-Shaw Microsoft Morgan Stanley OYO Rooms Google", remarks: "" },
  { topic: "Arrays", title: "Find Minimum in Rotated Sorted Array", companies: "Adobe Amazon Microsoft Morgan Stanley Samsung Snapdeal Times Internet", remarks: "" },
  { topic: "Arrays", title: "Find Pair with Sum in Sorted & Rotated Array", companies: "Microsoft + Google + Apple Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "3Sum", companies: "Adobe Amazon Microsoft Morgan Stanley Samsung Snapdeal Times Internet", remarks: "" },
  { topic: "Arrays", title: "Container With Most Water", companies: "Flipkart + Dunzo Interview Qs", remarks: "use 2 pointer approach" },
  { topic: "Arrays", title: "Given Sum Pair", companies: "Infosys + Amazon + Flipkart Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Kth - Smallest Element", companies: "ABCO Accolite Amazon Cisco Hike Microsoft Snapdeal VMWare Google Adobe", remarks: "" },
  { topic: "Arrays", title: "Merge Overlapping Intervals", companies: "Google Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Find Minimum Number of Merge Operations to Make an Array Palindrome", companies: "Amazon", remarks: "" },
  { topic: "Arrays", title: "Given an Array of Numbers Arrange the Numbers to Form the Biggest Number", companies: "Barclays Interview Qs", remarks: "Interview Qs" },
  { topic: "Arrays", title: "Space Optimization Using Bit Manipulations", companies: "Amazon", remarks: "" },
  { topic: "Arrays", title: "Subarray Sum Divisible K", companies: "Snapdeal Microsoft", remarks: "" },
  { topic: "Arrays", title: "Print all Possible Combinations of r Elements in a Given Array of Size n", companies: "Amazon", remarks: "" },
  { topic: "Arrays", title: "Mo's Algorithm", companies: "Microsoft", remarks: "" },

  // === PAGE 1: STRINGS ===
  { topic: "Strings", title: "Valid Palindrome", companies: "Amazon Cisco D-E-Shaw Facebook FactSet Morgan Stanley Paytm Zoho", remarks: "" },
  { topic: "Strings", title: "Valid Anagram", companies: "Nagarro Media.net Directi Google Adobe Flipkart", remarks: "" },
  { topic: "Strings", title: "Valid parentheses", companies: "Google Interview Qs", remarks: "use Stacks (if possible)" },
  { topic: "Strings", title: "Remove Consecutive Characters", companies: "Samsung + Adobe", remarks: "" },
  { topic: "Strings", title: "Longest Common Prefix", companies: "Adobe + Grofers + Dunzo Interview Qs", remarks: "Interview Qs" },
  { topic: "Strings", title: "Convert a Sentence into its Equivalent Mobile Numeric Keypad Sequence", companies: "Adobe", remarks: "" },
  { topic: "Strings", title: "Print all the Duplicates in the Input String", companies: "Ola + Amdocs IQ", remarks: "Interview Qs" },
  { topic: "Strings", title: "Longest Substring without Repeating Characters", companies: "Morgan Stanley + Amazon IQ", remarks: "Interview Qs" },
  { topic: "Strings", title: "Longest Repeating Character Replacement", companies: "Amazon Google", remarks: "" },
  { topic: "Strings", title: "Group Anagrams", companies: "Samsung + Adobe + Amazon Interview Qs", remarks: "Interview Qs" },
  { topic: "Strings", title: "Longest Palindromic Substring", companies: "Microsoft + Google + Samsung + Visa IQ", remarks: "Interview Qs" },
  { topic: "Strings", title: "Palindromic Substrings", companies: "Microsoft IQ", remarks: "Interview Qs" },
  { topic: "Strings", title: "Next Permutation (String)", companies: "Adobe + Goldman Sachs + Uber", remarks: "" },
  { topic: "Strings", title: "Count Palindromic Subsequences", companies: "Myntra Interview Qs", remarks: "Interview Qs" },
  { topic: "Strings", title: "Smallest Window in a String Containing all the Characters of Another String", companies: "Microsoft + Amazon IQ", remarks: "Interview Qs" },
  { topic: "Strings", title: "Wildcard String Matching", companies: "Microsoft + Amazon + Ola IQ", remarks: "Interview Qs" },
  { topic: "Strings", title: "Longest Prefix Suffix", companies: "Flipkart + Swiggy IQ", remarks: "Interview Qs" },
  { topic: "Strings", title: "Rabin-Karp Algorithm for Pattern Searching", companies: "Microsoft", remarks: "" },
  { topic: "Strings", title: "Transform One String to Another using Minimum Number of Given Operation", companies: "Directi", remarks: "" },
  { topic: "Strings", title: "Minimum Window Substring", companies: "Amazon Google MakeMyTrip Streamoid Technologies Microsoft Media.net Atlassian Flipkart", remarks: "" },
  { topic: "Strings", title: "Boyer Moore Algorithm for Pattern Searching", companies: "Amdocs", remarks: "" },
  { topic: "Strings", title: "Word Wrap", companies: "Microsoft", remarks: "use Dynamic Programming" },

  // === PAGE 1: 2D ARRAYS ===
  { topic: "2D Arrays", title: "Zigzag (or diagonal) Traversal of Matrix", companies: "Amazon", remarks: "" },
  { topic: "2D Arrays", title: "Set Matrix Zeroes", companies: "Amazon Microsoft", remarks: "" },
  { topic: "2D Arrays", title: "Spiral Matrix", companies: "Flipkart + Apple + Societe Generale IQ", remarks: "Interview Qs" },
  { topic: "2D Arrays", title: "Rotate Image", companies: "Microsoft Paytm Samsung Adobe", remarks: "" },
  { topic: "2D Arrays", title: "Word Search", companies: "Google + Ola + Goldman Sachs IQ", remarks: "Interview Qs" },
  { topic: "2D Arrays", title: "Find the Number of Islands | Set 1 (Using DFS)", companies: "Microsoft + Uber + Apple + Amazon IQ", remarks: "Read about DFS" },
  { topic: "2D Arrays", title: "Given a Matrix of ‘O’ and ‘X’, Replace ‘O’ with ‘X’ if Surrounded by ‘X’", companies: "Google", remarks: "" },
  { topic: "2D Arrays", title: "Find a Common Element in all Rows of a Given Row-Wise Sorted Matrix", companies: "MAQ Software Microsoft VMWare", remarks: "" },
  { topic: "2D Arrays", title: "Create a Matrix with Alternating Rectangles of O and X", companies: "MAQ VMWare", remarks: "" },
  { topic: "2D Arrays", title: "Maximum Size Rectangle of all 1s", companies: "Amazon Microsoft", remarks: "" },

  // === PAGE 1: SEARCHING & SORTING ===
  { topic: "Searching & Sorting", title: "Permute Two Arrays such that Sum of Every Pair is Greater or Equal to K", companies: "Samsung", remarks: "" },
  { topic: "Searching & Sorting", title: "counting sort", companies: "Samsung+ Morgan Stanley+ Snapdeal + EPAM Systems", remarks: "" },
  { topic: "Searching & Sorting", title: "find common elements three sorted arrays", companies: "MAQ Software Microsoft VMWare", remarks: "" },
  { topic: "Searching & Sorting", title: "Searching in an array where adjacent differ by at most k", companies: "TCS Amazon", remarks: "" },
  { topic: "Searching & Sorting", title: "ceiling in a sorted array", companies: "TCS", remarks: "" },
  { topic: "Searching & Sorting", title: "Piar with given difference", companies: "Amazon Visa", remarks: "" },
  { topic: "Searching & Sorting", title: "majority element", companies: "Amazon+ Google", remarks: "" },
  { topic: "Searching & Sorting", title: "count triplets with sum smaller that a given value", companies: "Amazon SAP Labs", remarks: "" },
  { topic: "Searching & Sorting", title: "Maximum Sum Subsequence with no adjacent elements", companies: "Amazon FactSet Oxigen Wallet OYO Rooms Paytm Walmart Yahoo Adobe Flipkart", remarks: "" },
  { topic: "Searching & Sorting", title: "Merge Sorted Arrays using O(1) Space", companies: "Amdocs Brocade Goldman Sachs Juniper Networks Linkedin Microsoft Quikr Snapdeal Synopsys Zoho Adobe", remarks: "" },
  { topic: "Searching & Sorting", title: "Inversion of Array", companies: "Adobe Amazon BankBazaar Flipkart Microsoft Myntra MakeMyTrip", remarks: "" },
  { topic: "Searching & Sorting", title: "Find Duplicates in O(n) Time and O(1) Extra Space", companies: "Amazon D-E-Shaw Flipkart Paytm Qualcomm Zoho", remarks: "" },
  { topic: "Searching & Sorting", title: "Radix Sort", companies: "Amazon+ Microsoft", remarks: "" },
  { topic: "Searching & Sorting", title: "Product of Array except itself", companies: "Accolite Amazon D-E-Shaw Intuit Morgan Stanley Opera Microsoft Flipkart", remarks: "" },
  { topic: "Searching & Sorting", title: "Make all Array Elements Equal", companies: "Amazon", remarks: "" },
  { topic: "Searching & Sorting", title: "Check if Reversing a Sub Array Make the Array Sorted", companies: "Amazon", remarks: "" },
  { topic: "Searching & Sorting", title: "Find Four Elements that Sum to a Given Value", companies: "Adobe Amazon Google Microsoft OYO Rooms", remarks: "" },
  { topic: "Searching & Sorting", title: "Median of Two Sorted Array with Different Size", companies: "Amazon Samsung Microsoft Google", remarks: "" },
  { topic: "Searching & Sorting", title: "Median of Stream of Integers Running Integers", companies: "Amazon + Google", remarks: "" },
  { topic: "Searching & Sorting", title: "Print Subarrays with 0 Sum", companies: "Paytm Adobe", remarks: "" },
  { topic: "Searching & Sorting", title: "Aggressive Cows", companies: "Adobe", remarks: "" },
  { topic: "Searching & Sorting", title: "Allocate Minimum number of Pages", companies: "Google Infosys Codenation Amazon Microsoft", remarks: "" },
  { topic: "Searching & Sorting", title: "Minimum Swaps to Sort", companies: "Amazon + Google", remarks: "" },

  // === PAGE 2: BACKTRACKING ===
  { topic: "Backtracking", title: "Backtracking Set 2 Rat in a Maze", companies: "Microsoft Amazon", remarks: "" },
  { topic: "Backtracking", title: "Combinational Sum", companies: "Adobe Amazon Microsoft", remarks: "" },
  { topic: "Backtracking", title: "Crossword-Puzzle", companies: "Microsoft", remarks: "" },
  { topic: "Backtracking", title: "Longest Possible Route in a Matrix with Hurdles", companies: "Microsoft", remarks: "" },
  { topic: "Backtracking", title: "Printing all solutions in N-Queen Problem", companies: "Accolite Amazon Amdocs D-E-Shaw MAQ Software Twitter Visa Microsoft", remarks: "" },
  { topic: "Backtracking", title: "Solve the Sudoku", companies: "Amazon Directi Flipkart MakeMyTrip MAQ Software Microsoft Ola Cabs Oracle PayPal Zoho", remarks: "" },
  { topic: "Backtracking", title: "Partition Equal Subset Sum", companies: "Amazon + Adobe + Accolite + Traveloka", remarks: "" },
  { topic: "Backtracking", title: "M Coloring Problem", companies: "Amazon", remarks: "" },
  { topic: "Backtracking", title: "Knight Tour", companies: "IBM", remarks: "" },
  { topic: "Backtracking", title: "Soduko", companies: "Amazon + Adobe + Accolite + Traveloka", remarks: "Sudoku variant / spelling in sheet" },
  { topic: "Backtracking", title: "Remove Invalid Parentheses", companies: "Uber", remarks: "" },
  { topic: "Backtracking", title: "Word Break Problem using Backtracking", companies: "", remarks: "" },
  { topic: "Backtracking", title: "Print all Palindromic Partitions of a String", companies: "Facebook Amazon Microsoft", remarks: "" },
  { topic: "Backtracking", title: "Find Shortest Safe Route in a Path with Landmines", companies: "Facebook Amazon Microsoft", remarks: "" },
  { topic: "Backtracking", title: "Partition of Set into K Subsets with Equal Sum", companies: "Amazon", remarks: "" },
  { topic: "Backtracking", title: "Backtracking set-7 hamiltonian cycle", companies: "Amazon", remarks: "" },
  { topic: "Backtracking", title: "tug-of-war", companies: "Google", remarks: "" },
  { topic: "Backtracking", title: "Maximum Possible Number by doing at most K swaps", companies: "Amazon + Adobe + Accolite + Traveloka", remarks: "" },
  { topic: "Backtracking", title: "Backtracking set-8 solving cryptarithmetic puzzles", companies: "Goldman Sachs", remarks: "" },
  { topic: "Backtracking", title: "Find paths from corner cell to middle cell in maze", companies: "Meta", remarks: "" },
  { topic: "Backtracking", title: "Arithmetic Expressions", companies: "Flipkart", remarks: "" },

  // === PAGE 2: LINKED LIST ===
  { topic: "Linked List", title: "Reverse Linked List", companies: "Sprinklr", remarks: "" },
  { topic: "Linked List", title: "Linked List Cycle", companies: "Accolite Amazon D-E-Shaw Hike Lybrate Mahindra Comviva MakeMyTrip MAQ Software OYO Rooms Paytm Qualcomm Samsung SAP Labs Snapdeal Veritas VMWare Walmart Adobe", remarks: "" },
  { topic: "Linked List", title: "Merge Two Sorted Lists", companies: "Accolite Amazon Belzabar Brocade FactSet Flipkart MakeMyTrip Microsoft OATS Systems Oracle Samsung Synopsys Zoho", remarks: "" },
  { topic: "Linked List", title: "Delete without Head node", companies: "Amazon Goldman Sachs Kritikal Solutions Microsoft Samsung Visa", remarks: "" },
  { topic: "Linked List", title: "Remove duplicates from an unsorted linked list", companies: "Amazon Intuit", remarks: "" },
  { topic: "Linked List", title: "Sort a linked list of 0s-1s-or-2s", companies: "Microsoft Amazon MakeMyTrip", remarks: "" },
  { topic: "Linked List", title: "Multiply two numbers represented linked lists", companies: "Amazon", remarks: "" },
  { topic: "Linked List", title: "Remove nth node from end of list", companies: "Accolite Adobe Amazon Citicorp Epic Systems FactSet Hike MAQ Software Monotype Solutions Morgan Stanley OYO Rooms Qualcomm Samsung Snapdeal Flipkart", remarks: "" },
  { topic: "Linked List", title: "Reorder List", companies: "Amazon Microsoft OYO Rooms Intuit", remarks: "" },
  { topic: "Linked List", title: "Detect and remove loop in a linked list", companies: "Accolite Amazon D-E-Shaw Hike Lybrate Mahindra Comviva MakeMyTrip MAQ Software OYO Rooms Paytm Qualcomm Samsung SAP Labs Snapdeal Veritas VMWare Walmart Adobe", remarks: "" },
  { topic: "Linked List", title: "Write a Function to get the Intersection Point of two Linked Lists", companies: "Amazon", remarks: "" },
  { topic: "Linked List", title: "Flatten a linked list with next and child pointers", companies: "Google", remarks: "" },
  { topic: "Linked List", title: "Linked list in zig-zag fashion", companies: "Microsoft", remarks: "" },
  { topic: "Linked List", title: "Reverse a doubly linked list", companies: "Walmart", remarks: "" },
  { topic: "Linked List", title: "Delete nodes which have a greater value on right side", companies: "Amazon", remarks: "" },
  { topic: "Linked List", title: "Segregate even and odd Elements in a Linked List", companies: "Walmart", remarks: "" },
  { topic: "Linked List", title: "Point to next higher value node in a linked list with an Arbitrary Pointer", companies: "GeekyAnts", remarks: "" },
  { topic: "Linked List", title: "Rearrange a given linked list in place", companies: "Ola Uber", remarks: "" },
  { topic: "Linked List", title: "Sort Biotonic Doubly Linked Lists", companies: "Morgan Stanley", remarks: "" },
  { topic: "Linked List", title: "Merge K Sorted Lists", companies: "Microsoft+ Ola+ eBay", remarks: "" },
  { topic: "Linked List", title: "Merge sort for linked list", companies: "Accolite Adobe Amazon MAQ Software Microsoft Paytm Veritas", remarks: "Important" },
  { topic: "Linked List", title: "Quicksort on singly-linked list", companies: "Paytm", remarks: "Important" },
  { topic: "Linked List", title: "Sum of two linked lists", companies: "Accolite Amazon Flipkart MakeMyTrip Microsoft Morgan Stanley Qualcomm Snapdeal", remarks: "" },
  { topic: "Linked List", title: "Flattening a linked list", companies: "24*7 Innovation Labs Amazon Drishti-Soft Flipkart Goldman Sachs Microsoft Paytm Payu Qualcomm Snapdeal Visa", remarks: "" },
  { topic: "Linked List", title: "Clone a linked list with next and random Pointer", companies: "Triology", remarks: "" },
  { topic: "Linked List", title: "Subtract two numbers represented as linked lists", companies: "Amazon Goldman Sachs", remarks: "" },

  // === PAGE 2: STACKS & QUEUES ===
  { topic: "Stacks & Queues", title: "Implement two stacks in an Array", companies: "24*7 Innovation Labs Microsoft Samsung Snapdeal", remarks: "" },
  { topic: "Stacks & Queues", title: "Evaluation of Postfix Expression", companies: "Amazon + Google + Facebook", remarks: "" },
  { topic: "Stacks & Queues", title: "Implement Stack using Queues", companies: "Facebook", remarks: "" },
  { topic: "Stacks & Queues", title: "Queue Reversal", companies: "Amazon + Morgan Stanley", remarks: "" },
  { topic: "Stacks & Queues", title: "Implement Stack Queue using Deque", companies: "Microsoft + Atlassian", remarks: "" },
  { topic: "Stacks & Queues", title: "Reverse first k elements of queue", companies: "Microsoft + Amdocs", remarks: "" },
  { topic: "Stacks & Queues", title: "Design Stack with Middle Operation", companies: "MAQ Software", remarks: "" },
  { topic: "Stacks & Queues", title: "Infix to Postfix", companies: "Amazon + Samsung + Paytm + VMWare inc", remarks: "" },
  { topic: "Stacks & Queues", title: "Design and Implement Special stack", companies: "Amazon Google Microsoft Visa Goldman Sachs", remarks: "" },
  { topic: "Stacks & Queues", title: "Longest Valid String", companies: "Google Microsoft", remarks: "" },
  { topic: "Stacks & Queues", title: "Find if an expression has duplicate parenthesis or not", companies: "Flipkart Oracle OYO Rooms Snapdeal Walmart Yatra.com Microsoft Google", remarks: "" },
  { topic: "Stacks & Queues", title: "Stack permutations check if an array is stack permutation of other", companies: "Visa", remarks: "" },
  { topic: "Stacks & Queues", title: "Count natural numbers whose permutation greater number", companies: "Amazon", remarks: "" },
  { topic: "Stacks & Queues", title: "Sort a stack using Recursion", companies: "Amazon Goldman Sachs IBM Intuit Kuliza Yahoo Microsoft", remarks: "" },
  { topic: "Stacks & Queues", title: "Queue based approach for first non repeating character in a stream", companies: "Microsoft Flipkart", remarks: "" },
  { topic: "Stacks & Queues", title: "The Celebrity Problem", companies: "Google + Visa + Apple", remarks: "" },
  { topic: "Stacks & Queues", title: "Next larger Element", companies: "Visa", remarks: "" },
  { topic: "Stacks & Queues", title: "Distance of nearest cell", companies: "Flipkart + Facebook", remarks: "" },
  { topic: "Stacks & Queues", title: "Rotten-oranges", companies: "Facebook", remarks: "" },
  { topic: "Stacks & Queues", title: "Next smaller element", companies: "Codenation", remarks: "" },
  { topic: "Stacks & Queues", title: "Circular-tour", companies: "Codenation Flipkart", remarks: "" },
  { topic: "Stacks & Queues", title: "Efficiently implement k-stacks single array", companies: "Flipkart", remarks: "" },
  { topic: "Stacks & Queues", title: "The celebrity problem (Variant)", companies: "Google + Visa + Apple", remarks: "Repeated row in course sheet" },
  { topic: "Stacks & Queues", title: "Iterative tower of hanoi", companies: "Microsoft Flipkart", remarks: "" },
  { topic: "Stacks & Queues", title: "Find the maximum of minimums for every window size in a given array", companies: "Amazon Microsoft Flipkart", remarks: "" },
  { topic: "Stacks & Queues", title: "lru cache implementation", companies: "Microsoft + Uber + Alibaba", remarks: "" },
  { topic: "Stacks & Queues", title: "Find a tour that visits all stations", companies: "Uber", remarks: "" },

  // === PAGE 2 & 3: GREEDY ===
  { topic: "Greedy", title: "Activity selection problem greedy algo", companies: "Facebook Morgan Stanley Flipkart", remarks: "" },
  { topic: "Greedy", title: "Greedy algorithm to find minimum number of coins", companies: "Accolite Amazon Morgan Stanley Oracle Paytm Samsung Snapdeal Synopsys Visa Microsoft Google", remarks: "" },
  { topic: "Greedy", title: "Minimum sum two numbers formed digits array-2", companies: "Google", remarks: "" },
  { topic: "Greedy", title: "Minimum sum absolute difference pairs two arrays", companies: "Amazon", remarks: "" },
  { topic: "Greedy", title: "Find maximum height pyramid from the given array of objects", companies: "Flipkart Amazon", remarks: "" },
  { topic: "Greedy", title: "Minimum cost for acquiring all coins with k extra coins allowed with every coin", companies: "", remarks: "" },
  { topic: "Greedy", title: "Find maximum equal sum of every three stacks", companies: "Microsoft Amazon Flipkart", remarks: "" },
  { topic: "Greedy", title: "Job sequencing problem", companies: "Microsoft + Accolite", remarks: "" },
  { topic: "Greedy", title: "Greedy algorithm egyptian fraction", companies: "", remarks: "" },
  { topic: "Greedy", title: "Fractional knapsack problem", companies: "Microsoft", remarks: "" },
  { topic: "Greedy", title: "Maximum length chain of pairs", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Greedy", title: "Find smallest number with given number of digits and digit sum", companies: "MAQ Software OYO Rooms", remarks: "" },
  { topic: "Greedy", title: "Maximize sum of consecutive differences circular-array", companies: "McAfee", remarks: "" },
  { topic: "Greedy", title: "paper-cut minimum number squares", companies: "Google", remarks: "" },
  { topic: "Greedy", title: "Lexicographically smallest array-k consecutive swaps", companies: "Amazon", remarks: "" },
  { topic: "Greedy", title: "Problems-CHOCOLA", companies: "Flipkart", remarks: "" },
  { topic: "Greedy", title: "Find minimum time to finish all jobs with given constraints", companies: "", remarks: "" },
  { topic: "Greedy", title: "Job sequencing using disjoint set union", companies: "Samsung", remarks: "" },
  { topic: "Greedy", title: "Rearrange characters string such that no two adjacent are same", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Greedy", title: "Minimum edges to reverse to make path from a source to a destination", companies: "", remarks: "" },
  { topic: "Greedy", title: "Minimize Cash Flow among a given set of friends who have borrowed money from each other", companies: "", remarks: "" },
  { topic: "Greedy", title: "Minimum Cost to cut a board into squares", companies: "McAfee", remarks: "" },

  // === PAGE 3: BINARY TREES ===
  { topic: "Binary Trees", title: "Maximum Depth of Binary Tree", companies: "Amazon Cadence India CouponDunia D-E-Shaw FactSet FreeCharge MakeMyTrip", remarks: "" },
  { topic: "Binary Trees", title: "Reverse Level Order Traversal", companies: "Amazon + Microsoft + Flipkart + Adobe", remarks: "" },
  { topic: "Binary Trees", title: "Subtree of Another Tree", companies: "Amazon + Microsoft + Facebook", remarks: "" },
  { topic: "Binary Trees", title: "Invert Binary Tree", companies: "Amazon Hike", remarks: "" },
  { topic: "Binary Trees", title: "Binary Tree Level Order Traversal", companies: "Accolite Adobe Amazon Cisco D-E-Shaw Flipkart", remarks: "" },
  { topic: "Binary Trees", title: "Left View of Binary Tree", companies: "Microsoft + Adobe + Cisco Networking Academy", remarks: "" },
  { topic: "Binary Trees", title: "Right View of Binary Tree", companies: "Amdocs", remarks: "" },
  { topic: "Binary Trees", title: "ZigZag Tree Traversal", companies: "Amazon Cisco FactSet Hike Snapdeal Walmart Microsoft Flipkart", remarks: "" },
  { topic: "Binary Trees", title: "Create a mirror tree from the given binary tree", companies: "Accolite Adobe Amazon Belzabar EBay Goldman Sachs Microsoft Morgan Stanley Myntra Ola Cabs Paytm", remarks: "" },
  { topic: "Binary Trees", title: "Leaf at same level", companies: "Amazon", remarks: "" },
  { topic: "Binary Trees", title: "Check for Balanced Tree", companies: "Amazon Walmart Microsoft", remarks: "" },
  { topic: "Binary Trees", title: "Transform to Sum Tree", companies: "Amazon FactSet Microsoft Samsung Walmart", remarks: "" },
  { topic: "Binary Trees", title: "Check if Tree is Isomorphic", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Binary Trees", title: "Same Tree", companies: "Amazon Microsoft Flipkart", remarks: "" },
  { topic: "Binary Trees", title: "Construct Binary Tree from Preorder and Inorder Traversal", companies: "Accolite Amazon Microsoft", remarks: "" },
  { topic: "Binary Trees", title: "Height of Binary Tree", companies: "Amazon Cadence India CouponDunia D-E-Shaw FactSet FreeCharge MakeMyTrip", remarks: "" },
  { topic: "Binary Trees", title: "Diameter of a Binary Tree", companies: "Amazon Microsoft OYO Rooms", remarks: "" },
  { topic: "Binary Trees", title: "Top View of Binary Tree", companies: "Microsoft + Adobe + Expedia Group", remarks: "" },
  { topic: "Binary Trees", title: "Bottom View of Binary Tree", companies: "DE Shaw India", remarks: "" },
  { topic: "Binary Trees", title: "Diagonal Traversal of Binary Tree", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Binary Trees", title: "Boundary Traversal of binary tree", companies: "Accolite Amazon FactSet Hike Kritikal Solutions", remarks: "" },
  { topic: "Binary Trees", title: "Construct Binary Tree from String with Brackets", companies: "Microsoft Morgan Stanley OYO Rooms Payu Samsung Snapdeal Flipkart", remarks: "" },
  { topic: "Binary Trees", title: "Minimum swap required to convert binary tree to binary search tree", companies: "Adobe Amazon", remarks: "" },
  { topic: "Binary Trees", title: "Duplicate subtree in Binary Tree", companies: "Google", remarks: "" },
  { topic: "Binary Trees", title: "Check if a given graph is tree or not", companies: "Microsoft Amazon", remarks: "" },
  { topic: "Binary Trees", title: "Lowest Common Ancestor in a Binary Tree", companies: "Accolite Amazon American Express Cisco Expedia Flipkart MakeMyTrip Microsoft OYO Rooms", remarks: "" },
  { topic: "Binary Trees", title: "Min distance between two given nodes of a Binary Tree", companies: "Amazon Linkedin MakeMyTrip Ola Cabs Qualcomm Samsung", remarks: "" },
  { topic: "Binary Trees", title: "Duplicate Subtrees", companies: "Ola", remarks: "" },
  { topic: "Binary Trees", title: "Kth ancestor of a node in binary tree", companies: "Josh Technology Group", remarks: "" },
  { topic: "Binary Trees", title: "Binary Tree Maximum Path Sum", companies: "Samsung + Facebook", remarks: "" },
  { topic: "Binary Trees", title: "Serialize and Deserialize Binary Tree", companies: "Flipkart InMobi Linkedin MAQ Software Microsoft Paytm Quikr Yahoo", remarks: "" },
  { topic: "Binary Trees", title: "Binary Tree to DLL", companies: "Accolite Amazon Goldman Sachs Microsoft Morgan Stanley Salesforce Snapdeal", remarks: "" },
  { topic: "Binary Trees", title: "Print all k-sum paths in a binary tree", companies: "Accolite Amazon Goldman Sachs", remarks: "" },

  // === PAGE 3: BINARY SEARCH TREES ===
  { topic: "Binary Search Trees", title: "Lowest Common Ancestor of a Binary Search Tree", companies: "Accolite Amazon Flipkart MAQ Software Microsoft Samsung Synopsys", remarks: "" },
  { topic: "Binary Search Trees", title: "Binary Search Tree | Set 1 (Search and Insertion)", companies: "Accolite Amazon Microsoft Paytm Samsung", remarks: "" },
  { topic: "Binary Search Trees", title: "Minimum element in BST", companies: "Microsoft", remarks: "" },
  { topic: "Binary Search Trees", title: "Predecessor and Successor", companies: "Google + Adobe + Goldman Sachs + Directi", remarks: "" },
  { topic: "Binary Search Trees", title: "Check whether BST contains Dead End", companies: "Walmart", remarks: "" },
  { topic: "Binary Search Trees", title: "Binary Tree to BST", companies: "HSBC", remarks: "" },
  { topic: "Binary Search Trees", title: "Kth largest element in BST", companies: "Accolite Amazon Samsung SAP Labs Microsoft", remarks: "" },
  { topic: "Binary Search Trees", title: "Validate Binary Search Tree", companies: "OYO Rooms Qualcomm Samsung Snapdeal VMWare Walmart Booker Amazon Facebook", remarks: "" },
  { topic: "Binary Search Trees", title: "Kth Smallest Element in a BST", companies: "Accolite Amazon Google", remarks: "" },
  { topic: "Binary Search Trees", title: "Delete Node in a BST", companies: "Adobe Barclays", remarks: "" },
  { topic: "Binary Search Trees", title: "Flatten BST to sorted list", companies: "Microsoft", remarks: "" },
  { topic: "Binary Search Trees", title: "Preorder to Postorder", companies: "Amazon Linkedin Flipkart", remarks: "" },
  { topic: "Binary Search Trees", title: "Count BST nodes that lie in a given range", companies: "D-E-Shaw Google", remarks: "" },
  { topic: "Binary Search Trees", title: "Populate Inorder Successor for all Nodes", companies: "SAP Labs", remarks: "" },
  { topic: "Binary Search Trees", title: "Convert Normal BST to Balanced BST", companies: "Paytm", remarks: "" },
  { topic: "Binary Search Trees", title: "Merge two BSTs", companies: "DE Shaw India", remarks: "" },
  { topic: "Binary Search Trees", title: "Given n appointments, find all conflicting appointments", companies: "Samsung", remarks: "" },
  { topic: "Binary Search Trees", title: "Replace every element", companies: "Samsung", remarks: "" },
  { topic: "Binary Search Trees", title: "Construct BST from given preorder traversal", companies: "Adobe Morgan Stanley Microsoft", remarks: "" },
  { topic: "Binary Search Trees", title: "Find median of BST in O(n) time and O(1) space", companies: "Amazon", remarks: "" },
  { topic: "Binary Search Trees", title: "Largest BST in a Binary Tree", companies: "Amazon D-E-Shaw Samsung Microsoft Flipkart", remarks: "Important" },

  // === PAGE 3: HEAPS & HASHING ===
  { topic: "Heaps & Hashing", title: "Choose k array elements such that difference of maximum and minimum is minimized", companies: "", remarks: "" },
  { topic: "Heaps & Hashing", title: "Heap Sort", companies: "Adobe", remarks: "" },
  { topic: "Heaps & Hashing", title: "Top K Frequent Elements", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Heaps & Hashing", title: "k largest elements in an array", companies: "Amazon Microsoft Walmart Adobe", remarks: "" },
  { topic: "Heaps & Hashing", title: "Next Greater Element", companies: "Amazon + Microsoft + Flipkart + Adobe", remarks: "" },
  { topic: "Heaps & Hashing", title: "K’th Smallest/Largest Element in Unsorted Array", companies: "ABCO Accolite Amazon Cisco Hike Microsoft Snapdeal VMWare Google Adobe", remarks: "" },
  { topic: "Heaps & Hashing", title: "Find the maximum repeating number in O(n) time and O(1) extra space", companies: "Accolite Amazon", remarks: "" },
  { topic: "Heaps & Hashing", title: "K-th smallest element after removing some integers from natural numbers", companies: "ABCO Accolite Amazon Cisco Hike Microsoft Snapdeal VMWare Google Adobe", remarks: "" },
  { topic: "Heaps & Hashing", title: "Find k closest elements to a given value", companies: "Amazon OYO Rooms", remarks: "" },
  { topic: "Heaps & Hashing", title: "K’th largest element in a stream", companies: "Amazon Cisco Hike OYO Rooms Walmart Microsoft Flipkart", remarks: "" },
  { topic: "Heaps & Hashing", title: "Connect Ropes", companies: "Amazon + OYO Rooms + Goldman Sachs", remarks: "" },
  { topic: "Heaps & Hashing", title: "Cuckoo Hashing", companies: "Amazon", remarks: "" },
  { topic: "Heaps & Hashing", title: "Itinerary from a List of Tickets", companies: "Microsoft + Ola + eBay", remarks: "" },
  { topic: "Heaps & Hashing", title: "Largest Subarray with 0 Sum", companies: "Amazon MakeMyTrip Microsoft", remarks: "" },
  { topic: "Heaps & Hashing", title: "Count distinct elements in every window of size k", companies: "Accolite Amazon Microsoft", remarks: "" },
  { topic: "Heaps & Hashing", title: "Group Shifted Strings", companies: "Oracle", remarks: "" },
  { topic: "Heaps & Hashing", title: "Merge K Sorted lists", companies: "Microsoft + Ola + eBay", remarks: "Heaps variant" },
  { topic: "Heaps & Hashing", title: "Find Median from Data Stream", companies: "Adobe Amazon Apple Belzabar D-E-Shaw Facebook Flipkart Google Intuit Microsoft Morgan Stanley Ola Cabs Oracle Samsung SAP Labs Yahoo", remarks: "" },
  { topic: "Heaps & Hashing", title: "Sliding Window Maximum", companies: "Amazon Directi Flipkart Microsoft Google", remarks: "" },
  { topic: "Heaps & Hashing", title: "Find the smallest positive number", companies: "Accolite Amazon Samsung Snapdeal", remarks: "" },
  { topic: "Heaps & Hashing", title: "Find Surpasser Count of each element in array", companies: "Amazon Morgan Stanley Ola Cabs SAP Labs", remarks: "" },
  { topic: "Heaps & Hashing", title: "Tournament Tree and Binary Heap", companies: "Amazon Ola Cabs Samsung Synopsys Walmart Microsoft", remarks: "" },
  { topic: "Heaps & Hashing", title: "Check for palindrome", companies: "Amazon Cisco D-E-Shaw Facebook FactSet Morgan Stanley Paytm Zoho", remarks: "" },
  { topic: "Heaps & Hashing", title: "Length of the largest subarray with contiguous elements", companies: "Amazon Intuit Microsoft", remarks: "" },
  { topic: "Heaps & Hashing", title: "Palindrome Substring Queries", companies: "Amazon Morgan Stanley Ola Cabs SAP Labs", remarks: "" },
  { topic: "Heaps & Hashing", title: "Subarray distinct elements", companies: "Microsoft + Ola + eBay", remarks: "" },
  { topic: "Heaps & Hashing", title: "Find the recurring function", companies: "MAQ Software", remarks: "" },
  { topic: "Heaps & Hashing", title: "K maximum sum combinations from two arrays", companies: "Amazon", remarks: "" },

  // === PAGE 3 & 4: GRAPHS ===
  { topic: "Graphs", title: "BFS", companies: "Samsung + Delhivery + SAP Labs", remarks: "" },
  { topic: "Graphs", title: "DFS", companies: "Samsung + Intuit + Goldman Sachs", remarks: "" },
  { topic: "Graphs", title: "Flood Fill Algorithm", companies: "Google + Adobe + Apple", remarks: "" },
  { topic: "Graphs", title: "Number of Triangles", companies: "IBM", remarks: "" },
  { topic: "Graphs", title: "Detect cycle in a graph", companies: "Lenskart", remarks: "" },
  { topic: "Graphs", title: "Detect cycle in an undirected graph", companies: "Samsung", remarks: "" },
  { topic: "Graphs", title: "Rat in a Maze Problem", companies: "Sharechat + Directi", remarks: "" },
  { topic: "Graphs", title: "Steps by Knight", companies: "Samsung", remarks: "" },
  { topic: "Graphs", title: "Clone graph", companies: "Google + MAQ Software + Apple + Facebook", remarks: "" },
  { topic: "Graphs", title: "Number of Operations to Make Network Connected", companies: "Samsung", remarks: "" },
  { topic: "Graphs", title: "Dijkstra’s shortest path algorithm", companies: "Amazon", remarks: "" },
  { topic: "Graphs", title: "Topological Sort", companies: "Amazon + Google + Flipkart + Oyo + Samsung", remarks: "" },
  { topic: "Graphs", title: "Oliver and the Game", companies: "Sharechat + Directi", remarks: "" },
  { topic: "Graphs", title: "Minimum time taken by each job to be completed given by a Directed Acyclic Graph", companies: "Amazon", remarks: "" },
  { topic: "Graphs", title: "Find whether it is possible to finish all tasks or not from given dependencies", companies: "Directi + Sharechat", remarks: "" },
  { topic: "Graphs", title: "Find the number of islands", companies: "Razorpay", remarks: "" },
  { topic: "Graphs", title: "Prim's Algo", companies: "Visa", remarks: "" },
  { topic: "Graphs", title: "Negative Weighted Cycle", companies: "Amazon", remarks: "" },
  { topic: "Graphs", title: "Floyd Warshall", companies: "Google + Uber", remarks: "" },
  { topic: "Graphs", title: "Graph Coloring", companies: "Morgan Stanley", remarks: "" },
  { topic: "Graphs", title: "Snakes and Ladders", companies: "Goldman Sachs + MakeMyTrip", remarks: "" },
  { topic: "Graphs", title: "Kosaraju's Theorem", companies: "Paytm", remarks: "" },
  { topic: "Graphs", title: "Journey to moon", companies: "Lenskart + Payload", remarks: "" },
  { topic: "Graphs", title: "Vertex Cover", companies: "Intuit", remarks: "" },
  { topic: "Graphs", title: "M Coloring Problem (Graph)", companies: "Uber", remarks: "" },
  { topic: "Graphs", title: "Cheapest Flights Within K Stops", companies: "Uber + Paypal", remarks: "" },
  { topic: "Graphs", title: "Find if there is a path of more than k length from a source", companies: "Cisco + Intuit", remarks: "" },
  { topic: "Graphs", title: "Bellman Ford", companies: "Sharechat + Directi", remarks: "" },
  { topic: "Graphs", title: "Bipartitie Graph", companies: "Microsoft Flipkart", remarks: "" },
  { topic: "Graphs", title: "Word-Ladder", companies: "Microsoft", remarks: "" },
  { topic: "Graphs", title: "Alien Dictionary", companies: "Samsung", remarks: "" },
  { topic: "Graphs", title: "Kruskals MST", companies: "Amazon Cisco Samsung", remarks: "Important" },
  { topic: "Graphs", title: "Total number spanning trees graph", companies: "Amazon Cisco Samsung Microsoft Flipkart", remarks: "" },
  { topic: "Graphs", title: "Travelling Salesman", companies: "Google + Microsoft + Opera", remarks: "Important" },
  { topic: "Graphs", title: "Find longest path directed acyclic graph", companies: "Google", remarks: "" },
  { topic: "Graphs", title: "Two Clique Problem", companies: "Microsoft", remarks: "" },
  { topic: "Graphs", title: "Minimise the cash flow", companies: "Intuit + Uber", remarks: "" },
  { topic: "Graphs", title: "Chinese postman", companies: "Intuit", remarks: "" },
  { topic: "Graphs", title: "Water Jug", companies: "Intuit + Uber", remarks: "" },
  { topic: "Graphs", title: "Water Jug 2", companies: "MakeMyTrip MAQ Software", remarks: "" },

  // === PAGE 4: TRIES ===
  { topic: "Tries", title: "Construct a trie from scratch", companies: "Accolite Amazon D-E-Shaw FactSet Microsoft", remarks: "" },
  { topic: "Tries", title: "Print unique rows in a given boolean matrix", companies: "Amazon Zoho", remarks: "" },
  { topic: "Tries", title: "Word Break Problem | (Trie solution)", companies: "Amazon Google Hike IBM MAQ Software Microsoft Walmart Zoho", remarks: "Trie solution" },
  { topic: "Tries", title: "Given a sequence of words, print all anagrams together", companies: "Amazon D-E-Shaw Goldman Sachs Morgan Stanley Snapdeal Microsoft", remarks: "" },
  { topic: "Tries", title: "Find shortest unique prefix for every word in a given list", companies: "Microsoft Google", remarks: "" },
  { topic: "Tries", title: "Implement a Phone Directory", companies: "Amazon + Microsoft + Snapdeal", remarks: "" },

  // === PAGE 4: DYNAMIC PROGRAMMING ===
  { topic: "Dynamic Programming", title: "Knapsack with Duplicate Items", companies: "Amazon", remarks: "" },
  { topic: "Dynamic Programming", title: "BBT counter", companies: "Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Reach a given score", companies: "Samsung", remarks: "" },
  { topic: "Dynamic Programming", title: "Maximum difference of zeros and ones in binary string", companies: "Ola", remarks: "" },
  { topic: "Dynamic Programming", title: "Climbing Stairs", companies: "Intuit", remarks: "" },
  { topic: "Dynamic Programming", title: "Permutation Coefficient", companies: "Amazon", remarks: "" },
  { topic: "Dynamic Programming", title: "Longest Repeating Subsequence", companies: "Google + Amazon", remarks: "" },
  { topic: "Dynamic Programming", title: "Pairs with specific difference", companies: "Ola", remarks: "" },
  { topic: "Dynamic Programming", title: "Longest subsequence-1", companies: "Amazon", remarks: "" },
  { topic: "Dynamic Programming", title: "Coin Change", companies: "Microsoft+ Samsung + Barclays + Apple + Adobe", remarks: "" },
  { topic: "Dynamic Programming", title: "LIS", companies: "Amazon + Google + Facebook + Fidelity International", remarks: "" },
  { topic: "Dynamic Programming", title: "Longest Common Subsequence", companies: "Siemens + Amazon + Google", remarks: "" },
  { topic: "Dynamic Programming", title: "Word Break", companies: "Amazon + Google + Microsoft + Walmart + Apple + IBM", remarks: "" },
  { topic: "Dynamic Programming", title: "Combination Sum IV", companies: "Adobe Amazon Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "House Robber", companies: "Apple + Uber", remarks: "" },
  { topic: "Dynamic Programming", title: "House Robber 2", companies: "Arrays Dynamic Programming", remarks: "" },
  { topic: "Dynamic Programming", title: "Decode Ways", companies: "Adobe + Uber", remarks: "" },
  { topic: "Dynamic Programming", title: "Unique Paths", companies: "Google + Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Jumps Game", companies: "Facebook Amazon Microsoft Google", remarks: "" },
  { topic: "Dynamic Programming", title: "Knapsack Problem", companies: "Amazon Directi Flipkart GreyOrange Microsoft Mobicip Morgan Stanley Oracle Payu Snapdeal Visa", remarks: "" },
  { topic: "Dynamic Programming", title: "nCr", companies: "Google", remarks: "" },
  { topic: "Dynamic Programming", title: "Catalan Number", companies: "Amazon + Google", remarks: "" },
  { topic: "Dynamic Programming", title: "Edit Distance", companies: "Google + Goldman Sachs + Citrix", remarks: "" },
  { topic: "Dynamic Programming", title: "Subset Sum", companies: "Amazon + Google", remarks: "" },
  { topic: "Dynamic Programming", title: "Gold mine", companies: "Samsung", remarks: "" },
  { topic: "Dynamic Programming", title: "Assembly Line Scheduling", companies: "Goldman Sachs", remarks: "" },
  { topic: "Dynamic Programming", title: "Maximize The Cut Segments", companies: "Amazon OYO Rooms Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Maximum sum increasing subsequence", companies: "Amazon Morgan Stanley Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Count all subsequences having product less than K", companies: "Goldman Sachs", remarks: "" },
  { topic: "Dynamic Programming", title: "Maximum sum increasing subsequence (Variant)", companies: "Amazon Morgan Stanley Microsoft", remarks: "Repeated row in source sheet" },
  { topic: "Dynamic Programming", title: "Egg dropping puzzle", companies: "Amazon D-E-Shaw Goldman Sachs Google Hike MakeMyTrip MAQ Software Myntra Nearbuy Opera Oracle Philips Samsung ServiceNow Unisys VMWare Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Max length chain", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Largest Square in Matrix", companies: "Amazon Samsung", remarks: "" },
  { topic: "Dynamic Programming", title: "Maximum Path Sum", companies: "Amazon + Microsoft + Oyo + Directi", remarks: "" },
  { topic: "Dynamic Programming", title: "Minimum Number of Jumps", companies: "Adobe Amazon Housing.com Moonfrog Labs Walmart Microsoft Google Flipkart", remarks: "" },
  { topic: "Dynamic Programming", title: "Minimum removals from array to make max – min <= K", companies: "Amazon", remarks: "" },
  { topic: "Dynamic Programming", title: "Longest Common Substring", companies: "Webarch Club", remarks: "" },
  { topic: "Dynamic Programming", title: "Partition Equal Subset Sum (DP)", companies: "Amazon + Accolite + Traveloka + Adobe", remarks: "DP version" },
  { topic: "Dynamic Programming", title: "Longest Palindromic Subsequence", companies: "Amazon Google", remarks: "" },
  { topic: "Dynamic Programming", title: "Count Palindromic Subsequences (DP)", companies: "Myntra", remarks: "" },
  { topic: "Dynamic Programming", title: "Longest Palindromic Substring (DP)", companies: "Amazon + Microsoft + Samsung + Visa", remarks: "" },
  { topic: "Dynamic Programming", title: "Longest Alternating Sequence", companies: "Ola", remarks: "" },
  { topic: "Dynamic Programming", title: "Weighted Job Scheduling", companies: "Intuit", remarks: "" },
  { topic: "Dynamic Programming", title: "Coin Game", companies: "Salesforce", remarks: "" },
  { topic: "Dynamic Programming", title: "Coin Game Winner", companies: "Ola", remarks: "" },
  { topic: "Dynamic Programming", title: "Optimal Strategy for a game", companies: "Google + IBM", remarks: "" },
  { topic: "Dynamic Programming", title: "Word Wrap (DP)", companies: "Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Mobile numeric keypad", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Maximum Length of Pair Chain", companies: "Amazon Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Matrix Chain Multiplication", companies: "Walmart + Flipkart", remarks: "" },
  { topic: "Dynamic Programming", title: "Maximum profit by buying and selling a share at most twice", companies: "Accolite Amazon Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Optimal BST", companies: "Google", remarks: "" },
  { topic: "Dynamic Programming", title: "Largest Submatrix with sum 0", companies: "Amazon MakeMyTrip Microsoft", remarks: "" },
  { topic: "Dynamic Programming", title: "Largest area rectangular sub-matrix with equal number of 1’s and 0’s", companies: "Amazon Directi Intuit MakeMyTrip Microsoft Samsung Google Flipkart", remarks: "" },

  // === PAGE 5: BIT MANIPULATION ===
  { topic: "Bit Manipulation", title: "Count set bits in an integer", companies: "Adobe Apple", remarks: "" },
  { topic: "Bit Manipulation", title: "Find the two non-repeating elements in an array of repeating elements", companies: "Accolite Amazon FactSet Google MakeMyTrip Microsoft Qualcomm Samsung", remarks: "" },
  { topic: "Bit Manipulation", title: "Program to find whether a no is power of two", companies: "Adobe", remarks: "" },
  { topic: "Bit Manipulation", title: "Find position of the only set bit", companies: "Microsoft", remarks: "" },
  { topic: "Bit Manipulation", title: "Count number of bits to be flipped to convert A to B", companies: "MAQ Software", remarks: "" },
  { topic: "Bit Manipulation", title: "Count total set bits in all numbers from 1 to n", companies: "Microsoft", remarks: "" },
  { topic: "Bit Manipulation", title: "Copy set bits in a range", companies: "Facebook", remarks: "" },
  { topic: "Bit Manipulation", title: "Calculate square of a number without using *, / and pow()", companies: "Amazon", remarks: "" },
  { topic: "Bit Manipulation", title: "Divide two integers without using multiplication, division and mod operator", companies: "Microsoft", remarks: "" },
  { topic: "Bit Manipulation", title: "Power Set", companies: "Google + Adobe + Paytm", remarks: "" },

  // === PAGE 5: SEGMENT TREES ===
  { topic: "Segment Trees", title: "Range Sum Query - Immutable", companies: "", remarks: "" },
  { topic: "Segment Trees", title: "Range Minimum Query", companies: "Google Interview Qs", remarks: "Interview Qs" },
  { topic: "Segment Trees", title: "Range Sum Query - Mutable", companies: "Alibaba", remarks: "" },
  { topic: "Segment Trees", title: "Create Sorted Array through Instructions", companies: "Samsung + Accolite", remarks: "" },
  { topic: "Segment Trees", title: "Count of Range Sum", companies: "Walmart", remarks: "" },
  { topic: "Segment Trees", title: "Count of Smaller Numbers After Self", companies: "Codenation Google", remarks: "" }
];

// Company Normalization map for high confidence OCR fixes
const companyCorrections = {
  "Flipkar": "Flipkart",
  "Amazoon": "Amazon",
  "Amaxon": "Amazon",
  "Morgain Stanley": "Morgan Stanley",
  "Micorsoft": "Microsoft",
  "Triology": "Trilogy",
  "Acolite": "Accolite",
  "Maccafe": "McAfee",
  "Vmware inc": "VMware",
  "VMWare": "VMware",
  "Sap labs": "SAP Labs",
  "DE Shaw India": "D-E-Shaw",
  "Lenksart": "Lenskart",
  "Service Now": "ServiceNow",
  "Traveloca": "Traveloka",
  "Wooker": "Booker",
  "Goladman Sachs": "Goldman Sachs",
  "Fipkart": "Flipkart",
  "Payu": "PayU"
};

function parseCompanies(rawCompanies) {
  if (!rawCompanies || !rawCompanies.trim()) return [];
  // Clean out common noisy tokens like 'Interview Qs', 'IQ', '+'
  let cleaned = rawCompanies
    .replace(/Interview Qs/gi, '')
    .replace(/\bIQ\b/g, '')
    .replace(/\+/g, ' ')
    .trim();

  // Split on spaces and commas while respecting known multi-word companies
  const multiWordList = [
    "Morgan Stanley", "Goldman Sachs", "D-E-Shaw", "MAQ Software", "SAP Labs", 
    "OYO Rooms", "Ola Cabs", "Times Internet", "Moonfrog Labs", "Epic Systems", 
    "Media.net", "Cisco Networking Academy", "Josh Technology Group", "Expedia Group",
    "24*7 Innovation Labs", "Drishti-Soft", "Monotype Solutions", "Kritikal Solutions",
    "Societe Generale", "EPAM Systems", "BankBazaar", "Housing.com", "Nearbuy"
  ];

  let foundMultiWords = [];
  multiWordList.forEach(mw => {
    const reg = new RegExp(mw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    if (reg.test(cleaned)) {
      foundMultiWords.push(mw);
      cleaned = cleaned.replace(reg, ' ');
    }
  });

  const singleTokens = cleaned.split(/\s+/).filter(t => t.length > 1);
  let all = [...foundMultiWords, ...singleTokens];

  // Apply corrections and deduplicate
  const result = [];
  all.forEach(c => {
    const norm = companyCorrections[c] || c;
    if (norm && !result.includes(norm) && norm.toLowerCase() !== 'qs') {
      result.push(norm);
    }
  });

  return result;
}

function extractTechniques(remarks, title, topic) {
  const techniques = [];
  const text = `${remarks} ${title} ${topic}`.toLowerCase();

  if (text.includes("kadane")) techniques.push("Kadane's Algorithm");
  if (text.includes("2 pointer") || text.includes("two pointer")) techniques.push("Two Pointer");
  if (text.includes("auxiliary array")) techniques.push("Auxiliary Arrays");
  if (text.includes("stack")) techniques.push("Stack");
  if (text.includes("dfs")) techniques.push("DFS");
  if (text.includes("bfs")) techniques.push("BFS");
  if (text.includes("dynamic programming") || text.includes(" dp")) techniques.push("Dynamic Programming");
  if (text.includes("binary search")) techniques.push("Binary Search");
  if (text.includes("sliding window")) techniques.push("Sliding Window");
  if (text.includes("heap")) techniques.push("Heap");
  if (text.includes("greedy")) techniques.push("Greedy");
  if (text.includes("backtracking")) techniques.push("Backtracking");
  if (text.includes("recursion")) techniques.push("Recursion");
  if (text.includes("trie")) techniques.push("Trie");
  if (text.includes("bit manipulation")) techniques.push("Bit Manipulation");
  if (text.includes("segment tree")) techniques.push("Segment Tree");

  return Array.from(new Set(techniques));
}

function generateSlug(title, topic, index) {
  const base = `${topic}-${title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${index}`;
}

const auditLogs = [];
const seenTitles = new Map();

const problems = rawEntries.map((entry, idx) => {
  const orderIndex = idx + 1;
  const companies = parseCompanies(entry.companies);
  const techniques = extractTechniques(entry.remarks, entry.title, entry.topic);
  const isImportant = /important/i.test(entry.remarks);
  const isInterviewQ = /interview qs| iq\b/i.test(entry.companies) || /interview/i.test(entry.remarks);

  // Check duplicate tracking
  const cleanTitleKey = entry.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (seenTitles.has(cleanTitleKey)) {
    auditLogs.push({
      originalIndex: orderIndex,
      title: entry.title,
      topic: entry.topic,
      matchedWithIndex: seenTitles.get(cleanTitleKey),
      reason: "Potential duplicate/variant row from sheet retained with distinct slug & orderIndex to prevent data loss."
    });
  } else {
    seenTitles.set(cleanTitleKey, orderIndex);
  }

  return {
    id: `prob-${String(orderIndex).padStart(3, '0')}`,
    title: entry.title,
    slug: generateSlug(entry.title, entry.topic, orderIndex),
    topic: entry.topic,
    difficulty: null, // As explicitly requested: nullable, do not guess
    companies: companies,
    rawCompanies: entry.companies || null,
    remarks: entry.remarks || null,
    techniques: techniques,
    isImportant: isImportant,
    isInterviewQ: isInterviewQ,
    source: "Apna College DSA Sheet",
    url: null,
    rawText: `${entry.topic} | ${entry.title} | ${entry.companies}${entry.remarks ? ' | ' + entry.remarks : ''}`,
    orderIndex: orderIndex
  };
});

fs.writeFileSync(path.join(__dirname, '../data/dsa-problems.json'), JSON.stringify(problems, null, 2));
fs.writeFileSync(path.join(__dirname, '../data/import-review.json'), JSON.stringify({
  totalExtracted: problems.length,
  timestamp: new Date().toISOString(),
  duplicatesAndAudits: auditLogs
}, null, 2));

console.log(`Successfully generated ${problems.length} problems in data/dsa-problems.json and audited in data/import-review.json`);

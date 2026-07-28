import { Problem } from '@/types';

export const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        id: 'ex1',
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        id: 'ex2',
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        id: 'ex3',
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
      }
    ],
    testCases: [
      { id: 'tc1', input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { id: 'tc2', input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
      { id: 'tc3', input: '[3,3]\n6', expectedOutput: '[0,1]' },
      { id: 'tc4', input: '[1,5,8,3,9,2]\n11', expectedOutput: '[1,4]' },
      { id: 'tc5', input: '[-1,-2,-3,-4,-5]\n-8', expectedOutput: '[2,4]' },
      { id: 'tc6', input: '[0,4,3,0]\n0', expectedOutput: '[0,3]' },
      { id: 'tc7', input: '[1,2,3,4,5,6,7,8,9,10]\n19', expectedOutput: '[8,9]' },
    ],
    approaches: [
      {
        type: 'brute',
        title: 'Brute Force - Nested Loops',
        description: 'Check every pair of numbers to find the two that sum to target.',
        intuition: 'The most straightforward approach is to check all possible pairs. For each element, we look at every other element to see if they add up to the target.',
        algorithm: [
          'Iterate through each element i from 0 to n-1',
          'For each element i, iterate through elements j from i+1 to n-1',
          'Check if nums[i] + nums[j] equals target',
          'If found, return [i, j]'
        ],
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'We use two nested loops, each iterating up to n times, giving us O(n²) time. No extra space is used beyond a few variables.'
      },
      {
        type: 'better',
        title: 'Sorting + Two Pointers',
        description: 'Sort the array and use two pointers from both ends.',
        intuition: 'After sorting, we can use two pointers - one at the start and one at the end. If sum is too large, move right pointer left. If too small, move left pointer right.',
        algorithm: [
          'Create array of [value, originalIndex] pairs',
          'Sort by value',
          'Use two pointers: left = 0, right = n-1',
          'While left < right: check sum, adjust pointers accordingly',
          'Return original indices when sum equals target'
        ],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Sorting takes O(n log n). The two-pointer scan is O(n). We need O(n) extra space to store original indices.'
      },
      {
        type: 'optimal',
        title: 'Hash Map - One Pass',
        description: 'Use a hash map to find complements in a single pass.',
        intuition: 'For each number, we need target - num (its complement). Instead of searching for the complement each time, we store seen numbers in a hash map for O(1) lookup.',
        algorithm: [
          'Create an empty hash map',
          'Iterate through the array with index i',
          'Calculate complement = target - nums[i]',
          'If complement exists in hash map, return [map[complement], i]',
          'Otherwise, store nums[i] -> i in the hash map'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'We traverse the array once (O(n)), and hash map operations are O(1) average. We store at most n elements in the hash map, using O(n) space.'
      }
    ],
    timeComplexity: { brute: 'O(n²)', better: 'O(n log n)', optimal: 'O(n)' },
    spaceComplexity: { brute: 'O(1)', better: 'O(n)', optimal: 'O(n)' },
    guessOutputPrompts: [
      {
        id: 'go1',
        code: `const nums = [2, 7, 11, 15];
const target = 9;
const map = {};
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (map[complement] !== undefined) {
    console.log([map[complement], i]);
    break;
  }
  map[nums[i]] = i;
}`,
        language: 'javascript',
        options: ['[0, 1]', '[1, 0]', '[2, 7]', 'undefined'],
        correctAnswer: 0,
        explanation: 'When i=0, complement=7, not in map, store {2:0}. When i=1, complement=2, found in map at index 0. Output: [0, 1].'
      },
      {
        id: 'go2',
        code: `const nums = [3, 2, 4];
const target = 6;
const map = {};
let result;
for (let i = 0; i < nums.length; i++) {
  map[nums[i]] = i;
}
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (map[complement] !== undefined && map[complement] !== i) {
    result = [i, map[complement]];
    break;
  }
}
console.log(result);`,
        language: 'javascript',
        options: ['[1, 2]', '[0, 0]', '[2, 1]', '[0, 1]'],
        correctAnswer: 0,
        explanation: 'Two-pass approach: first stores all indices. Then for i=0 (value 3), complement=3, found at index 0 but same index so skip. For i=1 (value 2), complement=4, found at index 2. Output: [1, 2].'
      }
    ],
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your code here
        pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
};`
    },
    solutions: {
      brute: {
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};`,
        java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}`,
        python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []`,
        javascript: `var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
};`
      },
      better: {
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<pair<int,int>> indexed;
        for (int i = 0; i < nums.size(); i++) {
            indexed.push_back({nums[i], i});
        }
        sort(indexed.begin(), indexed.end());

        int left = 0, right = indexed.size() - 1;
        while (left < right) {
            int sum = indexed[left].first + indexed[right].first;
            if (sum == target) {
                return {indexed[left].second, indexed[right].second};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};`,
        java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[][] indexed = new int[nums.length][2];
        for (int i = 0; i < nums.length; i++) {
            indexed[i] = new int[]{nums[i], i};
        }
        Arrays.sort(indexed, (a, b) -> a[0] - b[0]);

        int left = 0, right = nums.length - 1;
        while (left < right) {
            int sum = indexed[left][0] + indexed[right][0];
            if (sum == target) {
                return new int[]{indexed[left][1], indexed[right][1]};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }
}`,
        python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        indexed = sorted(enumerate(nums), key=lambda x: x[1])
        left, right = 0, len(indexed) - 1

        while left < right:
            current_sum = indexed[left][1] + indexed[right][1]
            if current_sum == target:
                return [indexed[left][0], indexed[right][0]]
            elif current_sum < target:
                left += 1
            else:
                right -= 1
        return []`,
        javascript: `var twoSum = function(nums, target) {
    const indexed = nums.map((val, idx) => [val, idx]);
    indexed.sort((a, b) => a[0] - b[0]);

    let left = 0, right = indexed.length - 1;
    while (left < right) {
        const sum = indexed[left][0] + indexed[right][0];
        if (sum === target) {
            return [indexed[left][1], indexed[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
};`
      },
      optimal: {
        cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
        java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
        python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        javascript: `var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`
      }
    }
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    topic: 'Linked List',
    companies: ['Microsoft', 'Amazon', 'Apple', 'Bloomberg'],
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    constraints: [
      'The number of nodes in the list is in the range [0, 5000]',
      '-5000 <= Node.val <= 5000'
    ],
    examples: [
      {
        id: 'ex1',
        input: 'head = [1,2,3,4,5]',
        expectedOutput: '[5,4,3,2,1]',
        explanation: 'The list is reversed from 1->2->3->4->5 to 5->4->3->2->1.'
      },
      {
        id: 'ex2',
        input: 'head = [1,2]',
        expectedOutput: '[2,1]',
      },
      {
        id: 'ex3',
        input: 'head = []',
        expectedOutput: '[]',
      }
    ],
    testCases: [
      { id: 'tc1', input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { id: 'tc2', input: '[1,2]', expectedOutput: '[2,1]' },
      { id: 'tc3', input: '[]', expectedOutput: '[]' },
      { id: 'tc4', input: '[1]', expectedOutput: '[1]' },
      { id: 'tc5', input: '[1,2,3]', expectedOutput: '[3,2,1]' },
    ],
    approaches: [
      {
        type: 'brute',
        title: 'Using Stack/Array',
        description: 'Store all values, then create new reversed list.',
        intuition: 'Traverse the list and store all node values in a stack or array. Then create a new linked list with values in reverse order.',
        algorithm: [
          'Traverse the linked list, push all values to a stack',
          'Create a new linked list by popping from the stack',
          'Return the new head'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'We traverse the list twice and use O(n) extra space for the stack.'
      },
      {
        type: 'optimal',
        title: 'Iterative - Three Pointers',
        description: 'Reverse links in-place using prev, curr, and next pointers.',
        intuition: 'We can reverse the list in-place by changing the next pointer of each node to point to the previous node. We need three pointers to track prev, current, and next.',
        algorithm: [
          'Initialize prev = null, curr = head',
          'While curr is not null:',
          '  Save next = curr.next',
          '  Reverse the link: curr.next = prev',
          '  Move prev and curr one step forward',
          'Return prev (new head)'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'We traverse the list once. Only three pointer variables are used regardless of input size.'
      },
      {
        type: 'better',
        title: 'Recursive Approach',
        description: 'Recursively reverse the rest of the list, then fix pointers.',
        intuition: 'Recursively reverse everything after the current node. The last node becomes the new head. On the way back up, point the next node back to current.',
        algorithm: [
          'Base case: if head is null or head.next is null, return head',
          'Recursively reverse the rest: newHead = reverse(head.next)',
          'Fix pointers: head.next.next = head; head.next = null',
          'Return newHead'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'We process each node once. The recursion stack uses O(n) space.'
      }
    ],
    timeComplexity: { brute: 'O(n)', better: 'O(n)', optimal: 'O(n)' },
    spaceComplexity: { brute: 'O(n)', better: 'O(n)', optimal: 'O(1)' },
    guessOutputPrompts: [
      {
        id: 'go1',
        code: `let prev = null;
let curr = { val: 1, next: { val: 2, next: { val: 3, next: null } } };
while (curr !== null) {
  let next = curr.next;
  curr.next = prev;
  prev = curr;
  curr = next;
}
console.log(prev.val, prev.next.val, prev.next.next.val);`,
        language: 'javascript',
        options: ['3 2 1', '1 2 3', '3 1 2', 'Error'],
        correctAnswer: 0,
        explanation: 'After iterative reversal, prev points to 3->2->1. Output: 3 2 1.'
      }
    ],
    starterCode: {
      cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your code here
    }
};`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
    }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        # Write your code here
        pass`,
      javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var reverseList = function(head) {
    // Write your code here
};`
    },
    solutions: {
      brute: {
        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        vector<int> values;
        ListNode* curr = head;
        while (curr) {
            values.push_back(curr->val);
            curr = curr->next;
        }
        curr = head;
        for (int i = values.size() - 1; i >= 0; i--) {
            curr->val = values[i];
            curr = curr->next;
        }
        return head;
    }
};`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        List<Integer> values = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            values.add(curr.val);
            curr = curr.next;
        }
        curr = head;
        for (int i = values.size() - 1; i >= 0; i--) {
            curr.val = values.get(i);
            curr = curr.next;
        }
        return head;
    }
}`,
        python: `class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        values = []
        curr = head
        while curr:
            values.append(curr.val)
            curr = curr.next
        curr = head
        for val in reversed(values):
            curr.val = val
            curr = curr.next
        return head`,
        javascript: `var reverseList = function(head) {
    const values = [];
    let curr = head;
    while (curr) {
        values.push(curr.val);
        curr = curr.next;
    }
    curr = head;
    for (let i = values.length - 1; i >= 0; i--) {
        curr.val = values[i];
        curr = curr.next;
    }
    return head;
};`
      },
      better: {
        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}`,
        python: `class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        new_head = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_head`,
        javascript: `var reverseList = function(head) {
    if (!head || !head.next) return head;
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};`
      },
      optimal: {
        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
        python: `class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev`,
        javascript: `var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};`
      }
    }
  },
  {
    id: 'best-time-to-buy-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-sell-stock',
    difficulty: 'Easy',
    topic: 'Arrays',
    companies: ['Amazon', 'Facebook', 'Microsoft', 'Goldman Sachs', 'Apple'],
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    examples: [
      {
        id: 'ex1',
        input: 'prices = [7,1,5,3,6,4]',
        expectedOutput: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      },
      {
        id: 'ex2',
        input: 'prices = [7,6,4,3,1]',
        expectedOutput: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    testCases: [
      { id: 'tc1', input: '[7,1,5,3,6,4]', expectedOutput: '5' },
      { id: 'tc2', input: '[7,6,4,3,1]', expectedOutput: '0' },
      { id: 'tc3', input: '[2,4,1]', expectedOutput: '2' },
      { id: 'tc4', input: '[1,2]', expectedOutput: '1' },
      { id: 'tc5', input: '[2,1,4]', expectedOutput: '3' },
      { id: 'tc6', input: '[3,3,3,3]', expectedOutput: '0' },
    ],
    approaches: [
      {
        type: 'brute',
        title: 'Brute Force - Check All Pairs',
        description: 'Check every possible buy-sell pair.',
        intuition: 'Try every combination of buying on day i and selling on day j where j > i.',
        algorithm: [
          'For each day i (buy day):',
          '  For each day j > i (sell day):',
          '    Calculate profit = prices[j] - prices[i]',
          '    Update maxProfit if this profit is larger',
          'Return maxProfit'
        ],
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Two nested loops over the array. No extra data structures needed.'
      },
      {
        type: 'optimal',
        title: 'One Pass - Track Minimum',
        description: 'Track the minimum price seen so far and calculate profit at each step.',
        intuition: 'As we scan left to right, we maintain the minimum price seen so far. At each position, the best profit we can get by selling today is current price - minimum so far.',
        algorithm: [
          'Initialize minPrice = infinity, maxProfit = 0',
          'For each price in the array:',
          '  Update minPrice = min(minPrice, price)',
          '  Update maxProfit = max(maxProfit, price - minPrice)',
          'Return maxProfit'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Single pass through the array. Only two variables maintained.'
      },
      {
        type: 'better',
        title: 'Kadane\'s Variant - Max Subarray on Differences',
        description: 'Convert to daily gains and apply Kadane\'s algorithm.',
        intuition: 'The stock problem is equivalent to finding the maximum sum subarray of daily price differences. If diff[i] = prices[i] - prices[i-1], the max profit is the max subarray sum of diff.',
        algorithm: [
          'Initialize currentGain = 0, maxGain = 0',
          'For i from 1 to n-1:',
          '  currentGain += prices[i] - prices[i-1]',
          '  If currentGain < 0, reset to 0',
          '  Update maxGain = max(maxGain, currentGain)',
          'Return maxGain'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Single pass. This is mathematically equivalent to the one-pass approach but uses a different perspective.'
      }
    ],
    timeComplexity: { brute: 'O(n²)', better: 'O(n)', optimal: 'O(n)' },
    spaceComplexity: { brute: 'O(1)', better: 'O(1)', optimal: 'O(1)' },
    guessOutputPrompts: [
      {
        id: 'go1',
        code: `const prices = [7, 1, 5, 3, 6, 4];
let minPrice = Infinity;
let maxProfit = 0;
for (const price of prices) {
  minPrice = Math.min(minPrice, price);
  maxProfit = Math.max(maxProfit, price - minPrice);
}
console.log(maxProfit);`,
        language: 'javascript',
        options: ['5', '6', '4', '7'],
        correctAnswer: 0,
        explanation: 'minPrice tracks: 7,1,1,1,1,1. maxProfit tracks: 0,0,4,4,5,5. Final answer: 5.'
      }
    ],
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
    }
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        # Write your code here
        pass`,
      javascript: `var maxProfit = function(prices) {
    // Write your code here
};`
    },
    solutions: {
      brute: {
        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxProfit = 0;
        for (int i = 0; i < prices.size(); i++) {
            for (int j = i + 1; j < prices.size(); j++) {
                maxProfit = max(maxProfit, prices[j] - prices[i]);
            }
        }
        return maxProfit;
    }
};`,
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
            }
        }
        return maxProfit;
    }
}`,
        python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        max_profit = 0
        for i in range(len(prices)):
            for j in range(i + 1, len(prices)):
                max_profit = max(max_profit, prices[j] - prices[i])
        return max_profit`,
        javascript: `var maxProfit = function(prices) {
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
        }
    }
    return maxProfit;
};`
      },
      better: {
        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int currentGain = 0, maxGain = 0;
        for (int i = 1; i < prices.size(); i++) {
            currentGain += prices[i] - prices[i-1];
            if (currentGain < 0) currentGain = 0;
            maxGain = max(maxGain, currentGain);
        }
        return maxGain;
    }
};`,
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int currentGain = 0, maxGain = 0;
        for (int i = 1; i < prices.length; i++) {
            currentGain += prices[i] - prices[i-1];
            if (currentGain < 0) currentGain = 0;
            maxGain = Math.max(maxGain, currentGain);
        }
        return maxGain;
    }
}`,
        python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        current_gain = 0
        max_gain = 0
        for i in range(1, len(prices)):
            current_gain += prices[i] - prices[i-1]
            if current_gain < 0:
                current_gain = 0
            max_gain = max(max_gain, current_gain)
        return max_gain`,
        javascript: `var maxProfit = function(prices) {
    let currentGain = 0, maxGain = 0;
    for (let i = 1; i < prices.length; i++) {
        currentGain += prices[i] - prices[i-1];
        if (currentGain < 0) currentGain = 0;
        maxGain = Math.max(maxGain, currentGain);
    }
    return maxGain;
};`
      },
      optimal: {
        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
};`,
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
}`,
        python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
        javascript: `var maxProfit = function(prices) {
    let minPrice = Infinity, maxProfit = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
};`
      }
    }
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topic: 'Stack',
    companies: ['Amazon', 'Bloomberg', 'Facebook', 'Google'],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    examples: [
      { id: 'ex1', input: 's = "()"', expectedOutput: 'true' },
      { id: 'ex2', input: 's = "()[]{}"', expectedOutput: 'true' },
      { id: 'ex3', input: 's = "(]"', expectedOutput: 'false' }
    ],
    testCases: [
      { id: 'tc1', input: '()', expectedOutput: 'true' },
      { id: 'tc2', input: '()[]{}', expectedOutput: 'true' },
      { id: 'tc3', input: '(]', expectedOutput: 'false' },
      { id: 'tc4', input: '([)]', expectedOutput: 'false' },
      { id: 'tc5', input: '{[]}', expectedOutput: 'true' },
      { id: 'tc6', input: '(', expectedOutput: 'false' },
      { id: 'tc7', input: '((()))', expectedOutput: 'true' },
    ],
    approaches: [
      {
        type: 'brute',
        title: 'Replace Pairs Iteratively',
        description: 'Repeatedly remove valid pairs until string is empty or no more removals possible.',
        intuition: 'Keep replacing "()", "[]", "{}" with empty string. If final string is empty, it was valid.',
        algorithm: [
          'While the string contains "()" or "[]" or "{}":',
          '  Replace all occurrences with empty string',
          'Return true if string is empty'
        ],
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Each replacement pass is O(n) and we might need O(n) passes for nested brackets.'
      },
      {
        type: 'optimal',
        title: 'Stack-Based Matching',
        description: 'Use a stack to match opening and closing brackets.',
        intuition: 'Push opening brackets onto stack. For closing brackets, check if top of stack has the matching opening bracket.',
        algorithm: [
          'Create a stack',
          'For each character in string:',
          '  If opening bracket, push to stack',
          '  If closing bracket:',
          '    If stack is empty or top doesn\'t match, return false',
          '    Otherwise, pop from stack',
          'Return true if stack is empty'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Single pass through the string. Stack can hold at most n/2 elements.'
      },
      {
        type: 'better',
        title: 'Stack with HashMap',
        description: 'Same as optimal but uses a map for cleaner bracket matching.',
        intuition: 'Use a hashmap to define bracket pairs, making the matching logic cleaner and more extensible.',
        algorithm: [
          'Define map: ) -> (, ] -> [, } -> {',
          'For each char:',
          '  If it\'s a closing bracket, check stack top matches map[char]',
          '  Otherwise push to stack',
          'Return stack.isEmpty()'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Same complexity as basic stack approach but more maintainable code.'
      }
    ],
    timeComplexity: { brute: 'O(n²)', better: 'O(n)', optimal: 'O(n)' },
    spaceComplexity: { brute: 'O(n)', better: 'O(n)', optimal: 'O(n)' },
    guessOutputPrompts: [
      {
        id: 'go1',
        code: `const s = "([)]";
const stack = [];
const map = { ')': '(', ']': '[', '}': '{' };
let valid = true;
for (const c of s) {
  if ('({['.includes(c)) {
    stack.push(c);
  } else {
    if (stack.pop() !== map[c]) {
      valid = false;
      break;
    }
  }
}
console.log(valid && stack.length === 0);`,
        language: 'javascript',
        options: ['false', 'true', 'undefined', 'Error'],
        correctAnswer: 0,
        explanation: 'Stack after "(": ["("]. After "[": ["(", "["]. Then ")" needs "(", but top is "[". Mismatch -> false.'
      }
    ],
    starterCode: {
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
    }
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass`,
      javascript: `var isValid = function(s) {
    // Write your code here
};`
    },
    solutions: {
      brute: {
        cpp: `class Solution {
public:
    bool isValid(string s) {
        while (s.find("()") != string::npos || s.find("[]") != string::npos || s.find("{}") != string::npos) {
            size_t pos;
            while ((pos = s.find("()")) != string::npos) s.erase(pos, 2);
            while ((pos = s.find("[]")) != string::npos) s.erase(pos, 2);
            while ((pos = s.find("{}")) != string::npos) s.erase(pos, 2);
        }
        return s.empty();
    }
};`,
        java: `class Solution {
    public boolean isValid(String s) {
        while (s.contains("()") || s.contains("[]") || s.contains("{}")) {
            s = s.replace("()", "").replace("[]", "").replace("{}", "");
        }
        return s.isEmpty();
    }
}`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        while '()' in s or '[]' in s or '{}' in s:
            s = s.replace('()', '').replace('[]', '').replace('{}', '')
        return s == ''`,
        javascript: `var isValid = function(s) {
    while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
        s = s.replace('()', '').replace('[]', '').replace('{}', '');
    }
    return s.length === 0;
};`
      },
      better: {
        cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> map = {{')', '('}, {']', '['}, {'}', '{'}};
        for (char c : s) {
            if (map.count(c)) {
                if (st.empty() || st.top() != map[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
        java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> map = Map.of(')', '(', ']', '[', '}', '{');
        for (char c : s.toCharArray()) {
            if (map.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != map.get(c)) return false;
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', ']': '[', '}': '{'}
        for c in s:
            if c in mapping:
                if not stack or stack.pop() != mapping[c]:
                    return False
            else:
                stack.append(c)
        return len(stack) == 0`,
        javascript: `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', ']': '[', '}': '{' };
    for (const c of s) {
        if (map[c]) {
            if (stack.pop() !== map[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
};`
      },
      optimal: {
        cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return st.empty();
    }
};`,
        java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return stack.isEmpty();
    }
}`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        for c in s:
            if c in '({[':
                stack.append(c)
            else:
                if not stack:
                    return False
                top = stack.pop()
                if c == ')' and top != '(':
                    return False
                if c == ']' and top != '[':
                    return False
                if c == '}' and top != '{':
                    return False
        return len(stack) == 0`,
        javascript: `var isValid = function(s) {
    const stack = [];
    for (const c of s) {
        if (c === '(' || c === '[' || c === '{') {
            stack.push(c);
        } else {
            if (!stack.length) return false;
            const top = stack.pop();
            if (c === ')' && top !== '(') return false;
            if (c === ']' && top !== '[') return false;
            if (c === '}' && top !== '{') return false;
        }
    }
    return stack.length === 0;
};`
      }
    }
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'Easy',
    topic: 'Linked List',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Adobe'],
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    constraints: [
      'The number of nodes in both lists is in the range [0, 50]',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    examples: [
      { id: 'ex1', input: 'list1 = [1,2,4], list2 = [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
      { id: 'ex2', input: 'list1 = [], list2 = []', expectedOutput: '[]' },
      { id: 'ex3', input: 'list1 = [], list2 = [0]', expectedOutput: '[0]' }
    ],
    testCases: [
      { id: 'tc1', input: '[1,2,4]\n[1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
      { id: 'tc2', input: '[]\n[]', expectedOutput: '[]' },
      { id: 'tc3', input: '[]\n[0]', expectedOutput: '[0]' },
      { id: 'tc4', input: '[1,3,5,7]\n[2,4,6,8]', expectedOutput: '[1,2,3,4,5,6,7,8]' },
      { id: 'tc5', input: '[5]\n[1,2,4]', expectedOutput: '[1,2,4,5]' },
    ],
    approaches: [
      {
        type: 'brute',
        title: 'Collect, Sort, Create',
        description: 'Collect all values, sort them, create new list.',
        intuition: 'Extract all values from both lists, sort them, then create a new linked list.',
        algorithm: [
          'Traverse both lists, collect all values in an array',
          'Sort the array',
          'Create a new linked list from sorted values'
        ],
        timeComplexity: 'O((m+n) log(m+n))',
        spaceComplexity: 'O(m+n)',
        complexityExplanation: 'Sorting dominates at O((m+n)log(m+n)). We store all values.'
      },
      {
        type: 'optimal',
        title: 'Iterative Merge',
        description: 'Use a dummy node and merge in-place by comparing heads.',
        intuition: 'Since both lists are sorted, we compare the heads and always pick the smaller one. A dummy node simplifies edge cases.',
        algorithm: [
          'Create a dummy head node',
          'Use a current pointer starting at dummy',
          'While both lists have nodes:',
          '  Attach the smaller node to current.next',
          '  Advance the chosen list and current',
          'Attach remaining nodes',
          'Return dummy.next'
        ],
        timeComplexity: 'O(m+n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'We visit each node exactly once. Only a few pointers are used (no new nodes created).'
      },
      {
        type: 'better',
        title: 'Recursive Merge',
        description: 'Recursively merge by choosing the smaller head each time.',
        intuition: 'Compare two heads. The smaller one becomes the head of merged list, and we recursively merge the rest.',
        algorithm: [
          'Base case: if either list is null, return the other',
          'If list1.val <= list2.val:',
          '  list1.next = merge(list1.next, list2)',
          '  return list1',
          'Else:',
          '  list2.next = merge(list1, list2.next)',
          '  return list2'
        ],
        timeComplexity: 'O(m+n)',
        spaceComplexity: 'O(m+n)',
        complexityExplanation: 'Each call processes one node. Recursion depth is O(m+n).'
      }
    ],
    timeComplexity: { brute: 'O((m+n)log(m+n))', better: 'O(m+n)', optimal: 'O(m+n)' },
    spaceComplexity: { brute: 'O(m+n)', better: 'O(m+n)', optimal: 'O(1)' },
    guessOutputPrompts: [
      {
        id: 'go1',
        code: `function merge(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val <= l2.val) {
    l1.next = merge(l1.next, l2);
    return l1;
  } else {
    l2.next = merge(l1, l2.next);
    return l2;
  }
}
// l1: 1->3, l2: 2->4
const l1 = {val:1, next:{val:3, next:null}};
const l2 = {val:2, next:{val:4, next:null}};
const r = merge(l1, l2);
console.log(r.val, r.next.val, r.next.next.val, r.next.next.next.val);`,
        language: 'javascript',
        options: ['1 2 3 4', '1 3 2 4', '2 1 3 4', '1 2 4 3'],
        correctAnswer: 0,
        explanation: 'Recursive merge picks smallest each time: 1, then 2, then 3, then 4.'
      }
    ],
    starterCode: {
      cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your code here
    }
}`,
      python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        # Write your code here
        pass`,
      javascript: `var mergeTwoLists = function(list1, list2) {
    // Write your code here
};`
    },
    solutions: {
      brute: {
        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        vector<int> vals;
        while (list1) { vals.push_back(list1->val); list1 = list1->next; }
        while (list2) { vals.push_back(list2->val); list2 = list2->next; }
        sort(vals.begin(), vals.end());
        ListNode dummy;
        ListNode* curr = &dummy;
        for (int v : vals) { curr->next = new ListNode(v); curr = curr->next; }
        return dummy.next;
    }
};`,
        java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        List<Integer> vals = new ArrayList<>();
        while (list1 != null) { vals.add(list1.val); list1 = list1.next; }
        while (list2 != null) { vals.add(list2.val); list2 = list2.next; }
        Collections.sort(vals);
        ListNode dummy = new ListNode();
        ListNode curr = dummy;
        for (int v : vals) { curr.next = new ListNode(v); curr = curr.next; }
        return dummy.next;
    }
}`,
        python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        vals = []
        while list1:
            vals.append(list1.val)
            list1 = list1.next
        while list2:
            vals.append(list2.val)
            list2 = list2.next
        vals.sort()
        dummy = ListNode()
        curr = dummy
        for v in vals:
            curr.next = ListNode(v)
            curr = curr.next
        return dummy.next`,
        javascript: `var mergeTwoLists = function(list1, list2) {
    const vals = [];
    while (list1) { vals.push(list1.val); list1 = list1.next; }
    while (list2) { vals.push(list2.val); list2 = list2.next; }
    vals.sort((a, b) => a - b);
    const dummy = new ListNode();
    let curr = dummy;
    for (const v of vals) { curr.next = new ListNode(v); curr = curr.next; }
    return dummy.next;
};`
      },
      better: {
        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        if (!list1) return list2;
        if (!list2) return list1;
        if (list1->val <= list2->val) {
            list1->next = mergeTwoLists(list1->next, list2);
            return list1;
        } else {
            list2->next = mergeTwoLists(list1, list2->next);
            return list2;
        }
    }
};`,
        java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if (list1 == null) return list2;
        if (list2 == null) return list1;
        if (list1.val <= list2.val) {
            list1.next = mergeTwoLists(list1.next, list2);
            return list1;
        } else {
            list2.next = mergeTwoLists(list1, list2.next);
            return list2;
        }
    }
}`,
        python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        if not list1: return list2
        if not list2: return list1
        if list1.val <= list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2`,
        javascript: `var mergeTwoLists = function(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;
    if (list1.val <= list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};`
      },
      optimal: {
        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy;
        ListNode* curr = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                curr->next = list1;
                list1 = list1->next;
            } else {
                curr->next = list2;
                list2 = list2->next;
            }
            curr = curr->next;
        }
        curr->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
        java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode();
        ListNode curr = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }
        curr.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
        python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode()
        curr = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next
        curr.next = list1 or list2
        return dummy.next`,
        javascript: `var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode();
    let curr = dummy;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }
    curr.next = list1 || list2;
    return dummy.next;
};`
      }
    }
  },
  {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    companies: ['Amazon', 'Bloomberg', 'Facebook', 'Microsoft', 'Google'],
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    examples: [
      { id: 'ex1', input: 's = "abcabcbb"', expectedOutput: '3', explanation: 'The answer is "abc", with length 3.' },
      { id: 'ex2', input: 's = "bbbbb"', expectedOutput: '1', explanation: 'The answer is "b", with length 1.' },
      { id: 'ex3', input: 's = "pwwkew"', expectedOutput: '3', explanation: 'The answer is "wke", with length 3.' }
    ],
    testCases: [
      { id: 'tc1', input: 'abcabcbb', expectedOutput: '3' },
      { id: 'tc2', input: 'bbbbb', expectedOutput: '1' },
      { id: 'tc3', input: 'pwwkew', expectedOutput: '3' },
      { id: 'tc4', input: '', expectedOutput: '0' },
      { id: 'tc5', input: 'abcdefg', expectedOutput: '7' },
      { id: 'tc6', input: 'aab', expectedOutput: '2' },
      { id: 'tc7', input: 'dvdf', expectedOutput: '3' },
    ],
    approaches: [
      {
        type: 'brute',
        title: 'Check All Substrings',
        description: 'Check every substring for uniqueness.',
        intuition: 'Generate all possible substrings and check if each has all unique characters. Track the longest one.',
        algorithm: [
          'For each starting index i:',
          '  For each ending index j > i:',
          '    Check if substring s[i..j] has all unique characters',
          '    If yes, update max length',
          'Return max length'
        ],
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(min(n, m))',
        complexityExplanation: 'O(n²) substrings, each taking O(n) to check uniqueness. m is charset size.'
      },
      {
        type: 'better',
        title: 'Sliding Window with Set',
        description: 'Use a set to track characters in current window.',
        intuition: 'Expand window to the right. When we find a duplicate, shrink from the left until the duplicate is removed.',
        algorithm: [
          'Use a set and two pointers (left, right)',
          'Move right pointer to expand window',
          'If s[right] is in set, remove s[left] and move left',
          'Otherwise, add s[right] to set and update max',
          'Return max length'
        ],
        timeComplexity: 'O(2n) = O(n)',
        spaceComplexity: 'O(min(n, m))',
        complexityExplanation: 'Each character is added and removed at most once. Set holds at most min(n, charset_size) chars.'
      },
      {
        type: 'optimal',
        title: 'Sliding Window with HashMap',
        description: 'Use a map to jump left pointer directly past the duplicate.',
        intuition: 'Instead of shrinking one by one, store the last index of each character. When we find a duplicate, jump left pointer directly past its last occurrence.',
        algorithm: [
          'Use a map: char -> last seen index',
          'For right pointer from 0 to n-1:',
          '  If s[right] seen and its index >= left:',
          '    Jump left to map[s[right]] + 1',
          '  Update map[s[right]] = right',
          '  Update maxLen = max(maxLen, right - left + 1)',
          'Return maxLen'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(min(n, m))',
        complexityExplanation: 'Single pass. Left pointer never moves backwards so total work is O(n).'
      }
    ],
    timeComplexity: { brute: 'O(n³)', better: 'O(n)', optimal: 'O(n)' },
    spaceComplexity: { brute: 'O(min(n,m))', better: 'O(min(n,m))', optimal: 'O(min(n,m))' },
    guessOutputPrompts: [
      {
        id: 'go1',
        code: `const s = "abcabcbb";
const map = new Map();
let left = 0, maxLen = 0;
for (let right = 0; right < s.length; right++) {
  if (map.has(s[right]) && map.get(s[right]) >= left) {
    left = map.get(s[right]) + 1;
  }
  map.set(s[right], right);
  maxLen = Math.max(maxLen, right - left + 1);
}
console.log(maxLen);`,
        language: 'javascript',
        options: ['3', '4', '7', '8'],
        correctAnswer: 0,
        explanation: 'Window slides: "abc"(3), then at second "a", left jumps to 1. Longest valid window is always 3.'
      }
    ],
    starterCode: {
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
    }
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass`,
      javascript: `var lengthOfLongestSubstring = function(s) {
    // Write your code here
};`
    },
    solutions: {
      brute: {
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            unordered_set<char> seen;
            for (int j = i; j < s.size(); j++) {
                if (seen.count(s[j])) break;
                seen.insert(s[j]);
                maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            Set<Character> seen = new HashSet<>();
            for (int j = i; j < s.length(); j++) {
                if (seen.contains(s.charAt(j))) break;
                seen.add(s.charAt(j));
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
}`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        max_len = 0
        for i in range(len(s)):
            seen = set()
            for j in range(i, len(s)):
                if s[j] in seen:
                    break
                seen.add(s[j])
                max_len = max(max_len, j - i + 1)
        return max_len`,
        javascript: `var lengthOfLongestSubstring = function(s) {
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        const seen = new Set();
        for (let j = i; j < s.length; j++) {
            if (seen.has(s[j])) break;
            seen.add(s[j]);
            maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
};`
      },
      better: {
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> window;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            while (window.count(s[right])) {
                window.erase(s[left]);
                left++;
            }
            window.insert(s[right]);
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> window = new HashSet<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            while (window.contains(s.charAt(right))) {
                window.remove(s.charAt(left));
                left++;
            }
            window.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        window = set()
        left = 0
        max_len = 0
        for right in range(len(s)):
            while s[right] in window:
                window.remove(s[left])
                left += 1
            window.add(s[right])
            max_len = max(max_len, right - left + 1)
        return max_len`,
        javascript: `var lengthOfLongestSubstring = function(s) {
    const window = new Set();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        while (window.has(s[right])) {
            window.delete(s[left]);
            left++;
        }
        window.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};`
      },
      optimal: {
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> lastSeen;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            if (lastSeen.count(s[right]) && lastSeen[s[right]] >= left) {
                left = lastSeen[s[right]] + 1;
            }
            lastSeen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        left = 0
        max_len = 0
        for right, c in enumerate(s):
            if c in last_seen and last_seen[c] >= left:
                left = last_seen[c] + 1
            last_seen[c] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
        javascript: `var lengthOfLongestSubstring = function(s) {
    const lastSeen = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        if (lastSeen.has(s[right]) && lastSeen.get(s[right]) >= left) {
            left = lastSeen.get(s[right]) + 1;
        }
        lastSeen.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};`
      }
    }
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    topic: 'Binary Search',
    companies: ['Google', 'Microsoft', 'Apple'],
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    examples: [
      { id: 'ex1', input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4' },
      { id: 'ex2', input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1' }
    ],
    testCases: [
      { id: 'tc1', input: '[-1,0,3,5,9,12]\n9', expectedOutput: '4' },
      { id: 'tc2', input: '[-1,0,3,5,9,12]\n2', expectedOutput: '-1' },
      { id: 'tc3', input: '[5]\n5', expectedOutput: '0' },
      { id: 'tc4', input: '[1,2,3,4,5]\n1', expectedOutput: '0' },
      { id: 'tc5', input: '[1,2,3,4,5]\n5', expectedOutput: '4' },
      { id: 'tc6', input: '[2,5]\n0', expectedOutput: '-1' },
    ],
    approaches: [
      {
        type: 'brute',
        title: 'Linear Search',
        description: 'Scan every element until target is found.',
        intuition: 'Simply iterate through the array and check each element.',
        algorithm: [
          'For each element in the array:',
          '  If element equals target, return its index',
          'Return -1 if not found'
        ],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'We might need to check every element. No extra space needed.'
      },
      {
        type: 'optimal',
        title: 'Binary Search',
        description: 'Repeatedly halve the search space.',
        intuition: 'Since the array is sorted, we can eliminate half the remaining elements each step by comparing target with the middle element.',
        algorithm: [
          'Set left = 0, right = n - 1',
          'While left <= right:',
          '  Calculate mid = left + (right - left) / 2',
          '  If nums[mid] == target, return mid',
          '  If nums[mid] < target, search right half: left = mid + 1',
          '  If nums[mid] > target, search left half: right = mid - 1',
          'Return -1'
        ],
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Each comparison halves the search space. After log₂(n) steps, we either find target or exhaust the space.'
      },
      {
        type: 'better',
        title: 'Recursive Binary Search',
        description: 'Same logic as iterative but implemented recursively.',
        intuition: 'Apply binary search recursively, passing updated bounds each time.',
        algorithm: [
          'Base case: if left > right, return -1',
          'Calculate mid',
          'If nums[mid] == target, return mid',
          'If target < nums[mid], recurse on left half',
          'Otherwise recurse on right half'
        ],
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(log n)',
        complexityExplanation: 'Same time as iterative. Recursion stack adds O(log n) space.'
      }
    ],
    timeComplexity: { brute: 'O(n)', better: 'O(log n)', optimal: 'O(log n)' },
    spaceComplexity: { brute: 'O(1)', better: 'O(log n)', optimal: 'O(1)' },
    guessOutputPrompts: [
      {
        id: 'go1',
        code: `const nums = [-1, 0, 3, 5, 9, 12];
const target = 9;
let left = 0, right = nums.length - 1;
let steps = 0;
while (left <= right) {
  steps++;
  const mid = Math.floor((left + right) / 2);
  if (nums[mid] === target) { console.log(mid, steps); break; }
  else if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}`,
        language: 'javascript',
        options: ['4 2', '4 3', '3 2', '4 1'],
        correctAnswer: 0,
        explanation: 'Step 1: mid=2, nums[2]=3<9, left=3. Step 2: mid=4, nums[4]=9==target. Found at index 4 in 2 steps.'
      }
    ],
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
    }
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        # Write your code here
        pass`,
      javascript: `var search = function(nums, target) {
    // Write your code here
};`
    },
    solutions: {
      brute: {
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        for i, num in enumerate(nums):
            if num == target:
                return i
        return -1`,
        javascript: `var search = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
};`
      },
      better: {
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        return binarySearch(nums, target, 0, nums.size() - 1);
    }
    int binarySearch(vector<int>& nums, int target, int left, int right) {
        if (left > right) return -1;
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) return binarySearch(nums, target, mid + 1, right);
        return binarySearch(nums, target, left, mid - 1);
    }
};`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        return binarySearch(nums, target, 0, nums.length - 1);
    }
    private int binarySearch(int[] nums, int target, int left, int right) {
        if (left > right) return -1;
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) return binarySearch(nums, target, mid + 1, right);
        return binarySearch(nums, target, left, mid - 1);
    }
}`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        def binary_search(left, right):
            if left > right:
                return -1
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                return binary_search(mid + 1, right)
            return binary_search(left, mid - 1)
        return binary_search(0, len(nums) - 1)`,
        javascript: `var search = function(nums, target) {
    function bs(left, right) {
        if (left > right) return -1;
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) return bs(mid + 1, right);
        return bs(left, mid - 1);
    }
    return bs(0, nums.length - 1);
};`
      },
      optimal: {
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
        javascript: `var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};`
      }
    }
  }
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find(p => p.slug === slug);
}

export function getProblemsByTopic(topic: string): Problem[] {
  return problems.filter(p => p.topic === topic);
}

export function getProblemsByDifficulty(difficulty: string): Problem[] {
  return problems.filter(p => p.difficulty === difficulty);
}

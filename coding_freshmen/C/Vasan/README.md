# Majority Element Implementation

## Problem Explanation 
The goal is to find the single element that occurs most frequently in the array, specifically appearing a number of times greater than half the array's total size.

### My logic

* **Approach:** Boyer-Moore Majority Vote Algorithm. This algorithm tracks a potential majority candidates and a counter. If the current element matches the candidate, the counter is incremented; otherwise, it is decremented. When the counter reaches zero, a new candidate is chosen. Since the majority element appears more than half the time, it will always be the last candidate remaining with a positive count.

* **Test cases:**
    * **Test Case 1 (Given Example):**
        * Input: `nums = [3, 2, 3]`
        * $n=3$, $\lfloor n/2 \rfloor = 1$. Majority element must appear $>1$ time.
        * Expected Output: `3`
    * **Test Case 2 (Large Array):**
        * Input: `nums = [2, 2, 1, 1, 1, 2, 2]`
        * $n=7$, $\lfloor n/2 \rfloor = 3$. Majority element must appear $>3$ times. '2' appears 4 times.
        * Expected Output: `2`

* **Code Structure and Libraries used:**
    * Standard C language.
    * The function uses a pointer to the array (`int *test_case`), the size of the array (`int size`), and a pointer to store the final result size. The core logic is implemented inside the `majorityElement` function.

### Time Complexity and Space Complexity

```c
// Time Complexity -> O(n)
// Space Complexity -> O(1)

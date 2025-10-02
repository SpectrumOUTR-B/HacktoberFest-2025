package coding_freshmen.JAVA.Arrays;

/**
 * MaxSubarraySum
 * -----------------------------
 * Problem: Find the maximum sum of a contiguous subarray within a given array
 * of integers. Approach: Kadane's Algorithm
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Input Example:
 * arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 *
 * Step-by-Step Dry Run:
 *
 * Initialize:
 * currentSum = -2 (first element)
 * maxSum     = -2
 *
 * Step 1: i=1 (arr[i]=1)
 *   currentSum = max(arr[i], currentSum + arr[i])
 *              = max(1, -2+1)
 *              = 1
 *   maxSum     = max(maxSum, currentSum)
 *              = max(-2, 1)
 *              = 1
 *
 * Step 2: i=2 (arr[i]=-3)
 *   currentSum = max(-3, 1 + (-3))
 *              = max(-3, -2)
 *              = -2
 *   maxSum = max(1, -2) = 1
 *
 * Step 3: i=3 (arr[i]=4)
 *   currentSum = max(4, -2 + 4)
 *              = max(4, 2)
 *              = 4
 *   maxSum = max(1, 4) = 4
 *
 * Step 4: i=4 (arr[i]=-1)
 *   currentSum = max(-1, 4 + (-1))
 *              = max(-1, 3)
 *              = 3
 *   maxSum = max(4, 3) = 4
 *
 * Step 5: i=5 (arr[i]=2)
 *   currentSum = max(2, 3 + 2)
 *              = max(2, 5)
 *              = 5
 *   maxSum = max(4, 5) = 5
 *
 * Step 6: i=6 (arr[i]=1)
 *   currentSum = max(1, 5 + 1)
 *              = max(1, 6)
 *              = 6
 *   maxSum = max(5, 6) = 6
 *
 * Step 7: i=7 (arr[i]=-5)
 *   currentSum = max(-5, 6 + (-5))
 *              = max(-5, 1)
 *              = 1
 *   maxSum = max(6, 1) = 6
 *
 * Step 8: i=8 (arr[i]=4)
 *   currentSum = max(4, 1 + 4)
 *              = max(4, 5)
 *              = 5
 *   maxSum = max(6, 5) = 6
 *
 * Result:
 * Maximum subarray sum = 6
 * Subarray contributing to max sum = [4, -1, 2, 1]
 *
 * Explanation:
 * - currentSum tracks the sum including the current element
 *   (or starts fresh if the sum becomes worse than the current element).
 * - maxSum tracks the highest sum encountered so far.
 */
public class MaxSubArraySum {

  public static int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];

    for (int i = 1; i < nums.length; i++) {
      currentSum = Math.max(nums[i], currentSum + nums[i]);
      maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
  }

  public static void main(String[] args) {
    int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    System.out.println("Maximum Subarray Sum: " + maxSubArray(arr));
  }
}

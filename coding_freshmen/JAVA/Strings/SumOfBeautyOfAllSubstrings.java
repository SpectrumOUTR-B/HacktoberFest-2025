import java.util.*;

/**
 * SumOfBeautyOfAllSubstrings
 * -----------------------------
 * Input: "aabcb"
 *
 * Dry Run & Diagram:
 *
 * Consider substring "aab":
 * Frequencies: a=2, b=1
 * MaxFreq - MinFreq = 2-1=1
 *
 * Consider substring "aabc":
 * Frequencies: a=2, b=1, c=1
 * MaxFreq - MinFreq = 2-1=1
 *
 * Visualization:
 * Substrings:    a   aa  aab  aabc  aabcb
 * Frequencies:  [1] [2] [2,1] [2,1,1] [2,2,1]
 * Beauty:       0    0    1       1       1
 */
public class SumOfBeautyOfAllSubstrings {

  public static int beautySum(String s) {
    int total = 0;
    for (int i = 0; i < s.length(); i++) {
      int[] freq = new int[26];
      for (int j = i; j < s.length(); j++) {
        freq[s.charAt(j) - 'a']++;
        int max = 0, min = Integer.MAX_VALUE;
        for (int f : freq) {
          if (f > 0) {
            max = Math.max(max, f);
            min = Math.min(min, f);
          }
        }
        total += max - min;
      }
    }
    return total;
  }

  public static void main(String[] args) {
    String input = "aabcb";
    System.out.println("Input: " + input);
    System.out.println("Sum of Beauty of All Substrings: " + beautySum(input));
  }
}

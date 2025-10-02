/**
 * ReverseWordsInAString
 * -----------------------------
 * Problem: Reverse the words in a given string.
 * Example: "Hello World" -> "World Hello"
 *
 * Approach:
 * 1. Split the string by spaces.
 * 2. Reverse the array of words.
 * 3. Join them back with a single space.
 *
 * Dry Run:
 * Input: "I love Java"
 *
 * Step 1: Split words -> ["I", "love", "Java"]
 * Step 2: Reverse array -> ["Java", "love", "I"]
 * Step 3: Join -> "Java love I"
 * Time Complexity: O(n) where n is the length of the string.
 * Space Complexity: O(n) for storing the words.
 */
public class ReverseWordsInAString {

  public static String reverseWords(String s) {
    String[] words = s.trim().split("\\s+"); // split by spaces
    StringBuilder sb = new StringBuilder();
    for (int i = words.length - 1; i >= 0; i--) {
      sb.append(words[i]);
      if (i != 0)
        sb.append(" ");
    }
    return sb.toString();
  }

  public static void main(String[] args) {
    String input = "I love Java";
    System.out.println("Original: " + input);
    System.out.println("Reversed Words: " + reverseWords(input));
  }
}

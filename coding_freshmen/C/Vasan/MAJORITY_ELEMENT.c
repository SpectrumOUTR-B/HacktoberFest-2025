#include <stdio.h>

// Function prototype
int majorityElement(int *test_case, int size);

int main()
{
    // 1st test case
    int test_case1[] = {3, 2, 3};
    int size1 = sizeof(test_case1) / sizeof(test_case1[0]);
    printf("Input: [3, 2, 3], Output: %d\n", majorityElement(test_case1, size1));

    //2nd test case
    int test_case2[] = {2, 2, 1, 1, 1, 2, 2};
    int size2 = sizeof(test_case2) / sizeof(test_case2[0]);
    printf("Input: [2, 2, 1, 1, 1, 2, 2], Output: %d\n", majorityElement(test_case2, size2));

    return 0;
}

// Boyer-Moore Majority Vote Algorithm.
int majorityElement(int *test_case, int size)
{
    int count = 0;
    int candidates = 0;

    for (int i = 0; i < size; i++)
    {
        if (count == 0)
        {
            candidates = test_case[i];
            count = 1;
        }
        else if (test_case[i] == candidates)
        {
            count++;
        }
        else
        {
            count--;
        }
    }

    return candidates;
}

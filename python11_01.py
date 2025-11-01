# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def modifiedList(self, nums, head):
        """
        :type nums: List[int]
        :type head: Optional[ListNode]
        :rtype: Optional[ListNode]
        """
        # Convert nums to a set for faster lookup
        remove_set = set(nums)
        
        # Create a dummy node to simplify head removals
        dummy = ListNode(0)
        dummy.next = head
        current = dummy
        
        # Traverse the list and skip nodes with values in nums
        while current.next:
            if current.next.val in remove_set:
                current.next = current.next.next  # Remove the node
            else:
                current = current.next  # Move to the next node

        return dummy.next

# ✅ Code Explanation
# # Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# 🔹 What is this for?

# This defines a basic node in a singly linked list:

# val stores the node's value.

# next points to the next node in the list.

# class Solution(object):
#     def modifiedList(self, nums, head):
#         """
#         :type nums: List[int]
#         :type head: Optional[ListNode]
#         :rtype: Optional[ListNode]
#         """


# This defines the solution function. It receives:

# nums: a list of values we need to remove from the list.

# head: first node of the linked list.

# ✅ Step 1: Convert list to a set
# remove_set = set(nums)


# Why use a set?

# List	Set
# Slower lookup	O(n) time
# Faster lookup	O(1) time

# We will frequently check: "Is this node's value one of the values to remove?" — so using a set speeds that up.

# ✅ Step 2: Use a Dummy Node
# dummy = ListNode(0)
# dummy.next = head
# current = dummy


# Why do we need a dummy node?

# What if the first node itself must be removed?

# If we start from head, deleting the head becomes tricky.

# A dummy node is like a temporary head placed before the real head to make deletions smooth.

# 📌 Diagram:

# dummy → head → node2 → node3 → ...
#    0       1


# Now current starts at dummy.

# ✅ Step 3: Traverse the Linked List
# while current.next:


# We don't check current, we check current.next. This helps us delete the next node directly without losing the link.

# ✅ Step 4: Remove Node If Its Value Exists in nums
# if current.next.val in remove_set:
#     current.next = current.next.next   # Skip the node


# Example:

# Before removal:
# current → [3] → [5] → [7]
#               ↑ delete if value in set

# After removal:
# current → [3] → [7]


# This removes the node with value 5 by bypassing it.

# ✅ Step 5: If Node Should Stay, Move Forward
# else:
#     current = current.next


# If the next node is safe, we move ahead.

# ✅ Step 6: Return the New Head
# return dummy.next


# Heads might have changed (original head may be removed!), so we return dummy.next.

# :::::::::::::::::::::  CODE STRUCTURE :::::::::::::::::::::
# (1) class ListNode(p)
# (1a) def __init__(3p){.val,.next}
# (2) class Solution(p)
# (2a) def modifiedList(3p){=set(),=ListNode(),.next,=}
# (2ai) while(p){if(p){.next=},else{=}}
# (2aii) return


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

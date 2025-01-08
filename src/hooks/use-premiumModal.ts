import { create } from "zustand";

// Define the state of the modal component
interface PremiumModalState {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Create the usePremiumModal hook with the state defined above and the initial state
const usePremiumModal = create<PremiumModalState>((set) => ({
  open: false, // Initial state
  onOpenChange: (open: boolean) => set({ open }), // Function to change the state of the modal using the set function
}));

// Export the usePremiumModal hook
export default usePremiumModal;
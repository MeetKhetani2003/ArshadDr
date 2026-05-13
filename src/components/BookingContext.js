"use client";
import { createContext, useContext, useState } from "react";
import BookingModal from "./BookingModal";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openBookingModal = (data = {}) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ openBookingModal, closeBookingModal }}>
      {children}
      <BookingModal 
        isOpen={isOpen} 
        onClose={closeBookingModal} 
        initialData={modalData} 
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

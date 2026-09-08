"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: "user" | "vet";
  clinicName?: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  birthdate: string;
  age: string;
  weight: string;
  height: string;
  drugAllergy: string;
  avatar: string;
  photoUrl?: string;
  ownerName: string;
  latestVaccine: string;
}

export interface ActivityButton {
  id: string;
  name: string;
  emoji: string;
  type: string;
  badgeDotColor?: string;
}

export interface ActivityLog {
  id: string;
  petId: string;
  type: string;
  title: string;
  emoji: string;
  time: string;
  note?: string;
}

export interface ChatThread {
  id: string;
  doctorName: string;
  avatarType: "da" | "donut" | "veerapon";
  lastMessage: string;
  unreadCount: number;
  clinicName: string;
  online: boolean;
  messages: {
    id: string;
    sender: "doctor" | "user";
    text: string;
    time: string;
  }[];
}

export interface VetPatient {
  id: string;
  ownerName: string;
  petName: string;
  isVIP?: boolean;
  avatarType: "reangmaew" | "tookae" | "shoki";
  lastVaccine: string;
  weight: string;
  checked: boolean;
  lastMessage: string;
  unreadCount: number;
}

export interface Appointment {
  id: string;
  petName: string;
  petType: string;
  ownerName: string;
  phone: string;
  clinicName: string;
  doctorName: string;
  serviceType: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
  fee?: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: "อุปกรณ์" | "การแพทย์" | "อาหาร" | "อื่นๆ";
  date: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface PetContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  userRole: "user" | "vet";
  setUserRole: (role: "user" | "vet") => void;
  isPremium: boolean;
  setIsPremium: (isPrem: boolean) => void;
  pets: Pet[];
  selectedPetIndex: number;
  setSelectedPetIndex: (index: number) => void;
  selectedPet: Pet;
  addPet: (pet: Omit<Pet, "id">) => void;
  activityButtons: ActivityButton[];
  addActivityButton: (btn: Omit<ActivityButton, "id">) => void;
  activityLogs: ActivityLog[];
  logActivity: (type: string, title: string, emoji?: string, note?: string) => void;
  removeActivityLog: (id: string) => void;
  chatThreads: ChatThread[];
  sendChatMessage: (threadId: string, text: string) => void;
  clearUnread: (threadId: string) => void;
  vetPatients: VetPatient[];
  updateVetPatient: (id: string, updates: Partial<VetPatient>) => void;
  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, "id">) => void;
  expenses: ExpenseItem[];
  addExpense: (exp: Omit<ExpenseItem, "id">) => void;
  deleteExpense: (id: string) => void;
  notifications: NotificationItem[];
  clearNotifications: () => void;
  resetForNewUser: (user?: Partial<UserProfile>) => void;
}

const defaultActivityButtons: ActivityButton[] = [
  { id: "food", name: "อาหาร", emoji: "🍲", type: "food", badgeDotColor: "#10B981" },
  { id: "poop", name: "ขับถ่าย", emoji: "💩", type: "poop" },
  { id: "walk", name: "เดินเล่น", emoji: "🐕", type: "walk" },
  { id: "bath", name: "อาบน้ำ", emoji: "🛁", type: "bath" },
];

const createInitialChats = (userName: string): ChatThread[] => [
  {
    id: "vet-1",
    doctorName: "แพทย์หญิงด้า",
    avatarType: "da",
    lastMessage: `ยินดีต้อนรับคุณ ${userName} สู่ PETMILY ค่ะ มีข้อสงสัยเรื่องสัตว์เลี้ยงทักถามหมอได้เลยนะคะ`,
    unreadCount: 1,
    clinicName: "นีเน่แคร์เซ็นเตอร์",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "doctor",
        text: `สวัสดีค่ะคุณ ${userName} ยินดีต้อนรับสู่ PETMILY ค่ะ มีข้อสงสัยหรือต้องการปรึกษาการดูแลสัตว์เลี้ยง สอบถามหมอได้ตลอดเลยนะคะ`,
        time: "เมื่อสักครู่",
      },
    ],
  },
  {
    id: "vet-2",
    doctorName: "แพทย์หญิงโดนัท",
    avatarType: "donut",
    lastMessage: "ยินดีให้คำปรึกษาสุขภาพสัตว์เลี้ยงค่ะ",
    unreadCount: 0,
    clinicName: "คลินิกรักษ์สัตว์",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "doctor",
        text: "สวัสดีค่ะ คลินิกรักษ์สัตว์ยินดีต้อนรับค่ะ ปรึกษาปัญหาสุขภาพหรือจองคิวฉีดวัคซีนได้นะคะ",
        time: "เมื่อสักครู่",
      },
    ],
  },
  {
    id: "vet-3",
    doctorName: "นพ. วีรพล ธนภูมิ",
    avatarType: "veerapon",
    lastMessage: "โรงพยาบาลสัตว์ท่าสะอ้านเปิดบริการ 24 ชม. ครับ",
    unreadCount: 0,
    clinicName: "โรงพยาบาลสัตว์ท่าสะอ้าน",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "doctor",
        text: "สวัสดีครับ โรงพยาบาลสัตว์ท่าสะอ้านยินดีให้บริการตรวจรักษาและดูแลสัตว์เลี้ยงของคุณครับ",
        time: "เมื่อสักครู่",
      },
    ],
  },
];

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    fullName: "ผู้ใช้งานทั่วไป",
    email: "user@petmily.app",
    phone: "08X-XXX-XXXX",
    role: "user",
  });

  const [userRole, setUserRole] = useState<"user" | "vet">("user");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState<number>(0);
  const [activityButtons, setActivityButtons] = useState<ActivityButton[]>(defaultActivityButtons);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(createInitialChats("ผู้ใช้งาน"));
  const [vetPatients, setVetPatients] = useState<VetPatient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n-1",
      title: "ยินดีต้อนรับสู่ PETMILY",
      message: "เริ่มต้นบันทึกข้อมูลและดูแลสัตว์เลี้ยงตัวโปรดของคุณได้เลย",
      time: "เมื่อสักครู่",
      unread: true,
    },
  ]);

  // Load from localStorage on mount (client-side)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("petmily_current_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setUserRole(parsed.role || "user");
      }

      const savedPremium = localStorage.getItem("petmily_is_premium");
      if (savedPremium) {
        setIsPremium(JSON.parse(savedPremium));
      }

      const savedPets = localStorage.getItem("petmily_pets");
      if (savedPets) {
        const parsedPets = JSON.parse(savedPets);
        if (Array.isArray(parsedPets)) setPets(parsedPets);
      }

      const savedLogs = localStorage.getItem("petmily_activity_logs");
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs);
        if (Array.isArray(parsedLogs)) setActivityLogs(parsedLogs);
      }

      const savedAppointments = localStorage.getItem("petmily_appointments");
      if (savedAppointments) {
        const parsedApps = JSON.parse(savedAppointments);
        if (Array.isArray(parsedApps)) setAppointments(parsedApps);
      }

      const savedExpenses = localStorage.getItem("petmily_expenses");
      if (savedExpenses) {
        const parsedExp = JSON.parse(savedExpenses);
        if (Array.isArray(parsedExp)) setExpenses(parsedExp);
      }
    } catch (e) {
      console.warn("Local storage restore error:", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("petmily_current_user", JSON.stringify(currentUser));
      localStorage.setItem("petmily_is_premium", JSON.stringify(isPremium));
      localStorage.setItem("petmily_pets", JSON.stringify(pets));
      localStorage.setItem("petmily_activity_logs", JSON.stringify(activityLogs));
      localStorage.setItem("petmily_appointments", JSON.stringify(appointments));
      localStorage.setItem("petmily_expenses", JSON.stringify(expenses));
    } catch (e) {
      console.warn("Local storage sync error:", e);
    }
  }, [currentUser, isPremium, pets, activityLogs, appointments, expenses]);

  const selectedPet: Pet = pets[selectedPetIndex] || pets[0] || {
    id: "pet-new",
    name: "สัตว์เลี้ยงของฉัน",
    type: "สัตว์เลี้ยง",
    breed: "ยังไม่ได้ระบุสายพันธุ์",
    birthdate: "",
    age: "รอการบันทึก",
    weight: "-",
    height: "-",
    drugAllergy: "ไม่มีประวัติแพ้ยา",
    avatar: "cat",
    ownerName: currentUser.fullName || "ผู้ใช้งาน",
    latestVaccine: "",
  };

  const resetForNewUser = (user?: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      fullName: user?.fullName || "ผู้ใช้งานทั่วไป",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "user",
      clinicName: user?.clinicName || "",
    };

    setCurrentUser(newUser);
    setUserRole(newUser.role);
    setIsPremium(false);
    setPets([]);
    setSelectedPetIndex(0);
    setActivityLogs([]);
    setAppointments([]);
    setExpenses([]);
    setChatThreads(createInitialChats(newUser.fullName));
    setNotifications([
      {
        id: `n-${Date.now()}`,
        title: `ยินดีต้อนรับคุณ ${newUser.fullName}`,
        message: "เริ่มต้นบันทึกข้อมูลสัตว์เลี้ยงของคุณเพื่อเริ่มใช้งานระบบทั้งหมด",
        time: "เมื่อสักครู่",
        unread: true,
      },
    ]);

    try {
      localStorage.setItem("petmily_current_user", JSON.stringify(newUser));
      localStorage.setItem("petmily_is_premium", JSON.stringify(false));
      localStorage.setItem("petmily_pets", JSON.stringify([]));
      localStorage.setItem("petmily_activity_logs", JSON.stringify([]));
      localStorage.setItem("petmily_appointments", JSON.stringify([]));
      localStorage.setItem("petmily_expenses", JSON.stringify([]));
    } catch (e) {}
  };

  const addPet = (newPetData: Omit<Pet, "id">) => {
    const newPet: Pet = {
      ...newPetData,
      photoUrl: newPetData.photoUrl || (newPetData.avatar?.startsWith("data:") ? newPetData.avatar : undefined),
      ownerName: currentUser.fullName || newPetData.ownerName,
      id: `pet-${Date.now()}`,
    };
    setPets((prev) => {
      const updated = [...prev, newPet];
      setSelectedPetIndex(updated.length - 1);
      try {
        localStorage.setItem("petmily_pets", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Add notification
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: `เพิ่ม ${newPet.name} สำเร็จ 🐾`,
        message: `บันทึกข้อมูล ${newPet.name} เรียบร้อยแล้ว พร้อมบันทึกกิจกรรมประจำวัน`,
        time: "เมื่อสักครู่",
        unread: true,
      },
      ...prev,
    ]);

    // Sync to Supabase
    supabase.from("pets").insert({
      name: newPet.name,
      type: newPet.type,
      breed: newPet.breed,
      birthdate: newPet.birthdate || null,
      age: newPet.age,
      weight: newPet.weight,
      height: newPet.height,
      drug_allergy: newPet.drugAllergy,
      avatar: newPet.photoUrl || newPet.avatar,
      owner_name: newPet.ownerName,
      latest_vaccine: newPet.latestVaccine,
    }).then(({ error }) => {
      if (error) console.warn("Supabase insert pet error:", error.message);
    });
  };

  const addActivityButton = (btn: Omit<ActivityButton, "id">) => {
    const newBtn: ActivityButton = {
      ...btn,
      id: `act-${Date.now()}`,
    };
    setActivityButtons((prev) => [...prev, newBtn]);

    supabase.from("activity_buttons").insert({
      name: btn.name,
      emoji: btn.emoji,
      type: btn.type,
      badge_dot_color: btn.badgeDotColor || null,
    }).then();
  };

  const logActivity = (type: string, title: string, emoji: string = "✨", note?: string) => {
    const timeNow = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น.";
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      petId: selectedPet?.id || "pet-1",
      type,
      title,
      emoji,
      time: timeNow,
      note,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    supabase.from("activity_logs").insert({
      pet_id: selectedPet?.id && selectedPet.id.includes("-") ? null : selectedPet?.id,
      type,
      title,
      emoji,
      time: timeNow,
      note: note || "",
    }).then();
  };

  const removeActivityLog = (id: string) => {
    setActivityLogs((prev) => prev.filter((log) => log.id !== id));
    if (!id.startsWith("log-")) {
      supabase.from("activity_logs").delete().eq("id", id).then();
    }
  };

  const sendChatMessage = (threadId: string, text: string) => {
    const timeNow = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            lastMessage: text,
            messages: [
              ...thread.messages,
              {
                id: `m-${Date.now()}`,
                sender: "user",
                text,
                time: timeNow,
              },
            ],
          };
        }
        return thread;
      })
    );

    if (!threadId.startsWith("vet-")) {
      supabase.from("chat_messages").insert({
        thread_id: threadId,
        sender: "user",
        text,
        time: timeNow,
      }).then();
    }
  };

  const clearUnread = (threadId: string) => {
    setChatThreads((prev) =>
      prev.map((thread) => (thread.id === threadId ? { ...thread, unreadCount: 0 } : thread))
    );
  };

  const updateVetPatient = (id: string, updates: Partial<VetPatient>) => {
    setVetPatients((prev) =>
      prev.map((pat) => (pat.id === id ? { ...pat, ...updates } : pat))
    );
  };

  const addAppointment = (app: Omit<Appointment, "id">) => {
    const newApp: Appointment = {
      ...app,
      id: `app-${Date.now()}`,
    };
    setAppointments((prev) => [newApp, ...prev]);

    // Add notification
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: `จองคิว ${app.clinicName} สำเร็จ`,
        message: `นัดหมาย ${app.serviceType} วันที่ ${app.date} เวลา ${app.time} เรียบร้อยแล้ว`,
        time: "เมื่อสักครู่",
        unread: true,
      },
      ...prev,
    ]);

    // Sync to Supabase appointments table
    supabase.from("appointments").insert({
      clinic_name: app.clinicName,
      doctor_name: app.doctorName,
      service_type: app.serviceType,
      appointment_date: app.date,
      appointment_time: app.time,
      owner_name: app.ownerName,
      pet_name: app.petName,
      phone: app.phone,
      note: app.notes || "",
      status: "confirmed",
    }).then();
  };

  const addExpense = (exp: Omit<ExpenseItem, "id">) => {
    const newExp: ExpenseItem = {
      ...exp,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExp, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const clearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <PetContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        isPremium,
        setIsPremium,
        pets,
        selectedPetIndex,
        setSelectedPetIndex,
        selectedPet,
        addPet,
        activityButtons,
        addActivityButton,
        activityLogs,
        logActivity,
        removeActivityLog,
        chatThreads,
        sendChatMessage,
        clearUnread,
        vetPatients,
        updateVetPatient,
        appointments,
        addAppointment,
        expenses,
        addExpense,
        deleteExpense,
        notifications,
        clearNotifications,
        resetForNewUser,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetProvider");
  }
  return context;
};

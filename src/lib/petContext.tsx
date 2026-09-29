"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export interface UserProfile {
  id?: string;
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
  removeActivityButton: (id: string) => void;
  activityLogs: ActivityLog[];
  logActivity: (type: string, title: string, emoji?: string, note?: string) => void;
  removeActivityLog: (id: string) => void;
  chatThreads: ChatThread[];
  setChatThreads: React.Dispatch<React.SetStateAction<ChatThread[]>>;
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
  themeMode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
  toggleTheme: () => void;
  upgradeToPremium: () => Promise<void>;
  fetchAppointments: (targetUser?: UserProfile) => Promise<void>;
  fetchPets: (targetUser?: UserProfile) => Promise<void>;
  fetchExpenses: (targetUser?: UserProfile) => Promise<void>;
  fetchChatMessages: (threadId: string) => Promise<void>;
  fetchNotifications: (targetUser?: UserProfile) => Promise<void>;
  addNotification: (item: Omit<NotificationItem, "id">) => Promise<void>;
  syncWithSupabase: (targetUser?: UserProfile) => Promise<void>;
}

const defaultActivityButtons: ActivityButton[] = [
  { id: "food", name: "อาหาร", emoji: "🍲", type: "food", badgeDotColor: "#10B981" },
  { id: "poop", name: "ขับถ่าย", emoji: "💩", type: "poop" },
  { id: "walk", name: "เดินเล่น", emoji: "🐕", type: "walk" },
  { id: "bath", name: "อาบน้ำ", emoji: "🛁", type: "bath" },
];

export const createInitialChats = (userName: string): ChatThread[] => [
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

export const DOCTOR_UUID_MAP: Record<string, string> = {
  "vet-1": "a0000000-0000-0000-0000-000000000001",
  "vet-2": "a0000000-0000-0000-0000-000000000002",
  "vet-3": "a0000000-0000-0000-0000-000000000003",
};

const defaultInitialAppointments: Appointment[] = [
  {
    id: "app-default-1",
    clinicName: "โรงพยาบาลสัตว์ท่าสะอ้าน",
    doctorName: "สัตวแพทย์ประจำเวร",
    serviceType: "ฉีดวัคซีนรวมประจำปี",
    date: "2026-10-01",
    time: "14:00 - 15:00 น.",
    ownerName: "อันดา",
    petName: "kuromi",
    petType: "cat",
    phone: "089-123-4567",
    status: "ยืนยันแล้ว",
    notes: "ฉีดวัคซีนรวมประจำปี",
    fee: "฿450.00",
  },
];

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    fullName: "",
    email: "",
    phone: "",
    role: "user",
  });

  const [userRole, setUserRole] = useState<"user" | "vet">("user");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState<number>(0);
  const [activityButtons, setActivityButtons] = useState<ActivityButton[]>(defaultActivityButtons);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [vetPatients, setVetPatients] = useState<VetPatient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [themeMode, setThemeModeState] = useState<"light" | "dark">("light");

  const setThemeMode = (mode: "light" | "dark") => {
    setThemeModeState(mode);
    try {
      localStorage.setItem("petmily_theme", mode);
      if (typeof document !== "undefined") {
        if (mode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    } catch (e) {}
  };

  const toggleTheme = () => {
    const nextMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextMode);
  };

  // Load from localStorage on mount (client-side)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("petmily_theme") as "light" | "dark" | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeModeState(savedTheme);
        if (typeof document !== "undefined") {
          if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      }

      const savedUser = localStorage.getItem("petmily_current_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setUserRole(parsed.role || "user");
      }

      const savedPremium = localStorage.getItem("petmily_is_premium");
      if (savedPremium !== null) {
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

      const savedActivityButtons = localStorage.getItem("petmily_activity_buttons");
      if (savedActivityButtons) {
        const parsedBtns = JSON.parse(savedActivityButtons);
        if (Array.isArray(parsedBtns) && parsedBtns.length > 0) setActivityButtons(parsedBtns);
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

      const savedChats = localStorage.getItem("petmily_chat_threads");
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        if (Array.isArray(parsedChats) && parsedChats.length > 0) {
          setChatThreads(parsedChats);
        }
      }

      const savedNotifs = localStorage.getItem("petmily_notifications");
      if (savedNotifs) {
        const parsedNotifs = JSON.parse(savedNotifs);
        if (Array.isArray(parsedNotifs) && parsedNotifs.length > 0) {
          setNotifications(parsedNotifs);
        }
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
      localStorage.setItem("petmily_activity_buttons", JSON.stringify(activityButtons));
      localStorage.setItem("petmily_activity_logs", JSON.stringify(activityLogs));
      localStorage.setItem("petmily_appointments", JSON.stringify(appointments));
      localStorage.setItem("petmily_expenses", JSON.stringify(expenses));
      localStorage.setItem("petmily_chat_threads", JSON.stringify(chatThreads));
      localStorage.setItem("petmily_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.warn("Local storage sync error:", e);
    }
  }, [currentUser, isPremium, pets, activityButtons, activityLogs, appointments, expenses, chatThreads, notifications]);

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
      id: user?.id,
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "user",
      clinicName: user?.clinicName || "",
    };

    setCurrentUser(newUser);
    setUserRole(newUser.role as "user" | "vet");
    setIsPremium(false);
    // Clear all user-specific state
    setPets([]);
    setChatThreads([]);
    setAppointments([]);
    setExpenses([]);
    setNotifications([]);
    setActivityLogs([]);
    setActivityButtons(defaultActivityButtons);
    setSelectedPetIndex(0);

    // Clear localStorage to prevent any stale data from other users
    try {
      localStorage.removeItem("petmily_appointments");
      localStorage.removeItem("petmily_pets");
      localStorage.removeItem("petmily_activity_logs");
      localStorage.removeItem("petmily_expenses");
      localStorage.removeItem("petmily_chat_threads");
      localStorage.removeItem("petmily_notifications");
      localStorage.setItem("petmily_current_user", JSON.stringify(newUser));
      localStorage.setItem("petmily_is_premium", JSON.stringify(false));
    } catch (e) {}

    // If user profile has identifiers, fetch only this user's data from Supabase
    if (newUser.fullName || newUser.email || newUser.id || newUser.phone) {
      syncWithSupabase(newUser);
    }
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
    addNotification({
      title: `เพิ่ม ${newPet.name} สำเร็จ 🐾`,
      message: `บันทึกข้อมูล ${newPet.name} เรียบร้อยแล้ว พร้อมบันทึกกิจกรรมประจำวัน`,
      time: "เมื่อสักครู่",
      unread: true,
    });

    // Sync to Supabase with user_id
    const petPayload: any = {
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
    };
    if (currentUser.id) {
      petPayload.user_id = currentUser.id;
    }

    supabase.from("pets").insert(petPayload).then(({ error }) => {
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

  const removeActivityButton = (id: string) => {
    setActivityButtons((prev) => prev.filter((btn) => btn.id !== id));
  };

  const removeActivityLog = (id: string) => {
    const targetLog = activityLogs.find((l) => l.id === id);
    if (targetLog) {
      const cleanTitle = targetLog.title.replace(/^บันทึก/, "").trim();
      setActivityButtons((prev) =>
        prev.filter((btn) => {
          // Keep default non-custom buttons unless explicitly removed
          if (["food", "poop", "walk", "bath"].includes(btn.id) && btn.type !== "custom") {
            return true;
          }
          // If this button matches the removed activity's emoji or title, remove it
          if (
            btn.emoji === targetLog.emoji ||
            btn.name === cleanTitle ||
            btn.name === targetLog.title ||
            (targetLog.type === "custom" && btn.type === "custom" && btn.name === cleanTitle)
          ) {
            return false;
          }
          return true;
        })
      );
    }
    setActivityLogs((prev) => prev.filter((log) => log.id !== id));
    if (!id.startsWith("log-")) {
      supabase.from("activity_logs").delete().eq("id", id).then();
    }
  };

  const upgradeToPremium = async () => {
    setIsPremium(true);
    try {
      localStorage.setItem("petmily_is_premium", JSON.stringify(true));
      const updatedUser = { ...currentUser, isPremium: true };
      setCurrentUser(updatedUser);
      localStorage.setItem("petmily_current_user", JSON.stringify(updatedUser));

      // Populate and persist recommended doctor consultation chats
      const initialChats = createInitialChats(currentUser.fullName || "ผู้ใช้งาน");
      setChatThreads(initialChats);
      try {
        localStorage.setItem("petmily_chat_threads", JSON.stringify(initialChats));
      } catch (e) {}

      // Sync to Supabase profiles with is_premium
      await supabase.from("profiles").upsert(
        {
          id: currentUser.id || undefined,
          full_name: currentUser.fullName || "ผู้ใช้งาน",
          email: currentUser.email || "user@petmily.app",
          role: userRole,
          is_premium: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

      // Attempt to save subscription record in Supabase
      try {
        await supabase.from("subscriptions").insert({
          user_id: currentUser.id || null,
          user_email: currentUser.email || "user@petmily.app",
          status: "active",
          created_at: new Date().toISOString(),
        });
      } catch (subErr) {
        // Table might not exist, safe fallback
      }

      // Persist recommended doctor chat threads to Supabase
      for (const chat of initialChats) {
        const dbThreadId = DOCTOR_UUID_MAP[chat.id];
        if (dbThreadId) {
          await supabase.from("chat_threads").upsert(
            {
              id: dbThreadId,
              doctor_name: chat.doctorName,
              clinic_name: chat.clinicName,
              avatar_type: chat.avatarType,
              last_message: chat.lastMessage,
              online: true,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        }
      }

      // Add Notification to Supabase and Local
      await addNotification({
        title: "ยินดีต้อนรับสู่ PetCare Premium ⭐",
        message: "สิทธิประโยชน์ VIP ของคุณเปิดใช้งานเรียบร้อยแล้ว แชทปรึกษาแพทย์ได้ตลอด 24 ชม.",
        time: "เมื่อสักครู่",
        unread: true,
      });
    } catch (err) {
      console.warn("upgradeToPremium sync error:", err);
    }
  };

  const sendChatMessage = async (threadId: string, text: string) => {
    const timeNow = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    const newMsgId = `m-${Date.now()}`;
    const targetThread = chatThreads.find((t) => t.id === threadId);
    const dbThreadId =
      DOCTOR_UUID_MAP[threadId] ||
      (threadId.includes("-") && threadId.length === 36 ? threadId : DOCTOR_UUID_MAP["vet-1"]);

    // 1. Immediate optimistic UI update
    setChatThreads((prev) => {
      const updated = prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            lastMessage: text,
            messages: [
              ...thread.messages,
              {
                id: newMsgId,
                sender: "user" as const,
                text,
                time: timeNow,
              },
            ],
          };
        }
        return thread;
      });
      try {
        localStorage.setItem("petmily_chat_threads", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 2. Persist User Message to Supabase
    try {
      if (dbThreadId) {
        // Upsert thread record
        await supabase
          .from("chat_threads")
          .upsert(
            {
              id: dbThreadId,
              doctor_name: targetThread?.doctorName || "สัตวแพทย์",
              clinic_name: targetThread?.clinicName || "โรงพยาบาลสัตว์",
              avatar_type: targetThread?.avatarType || "da",
              last_message: text,
              online: true,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );

        // Insert chat message
        await supabase.from("chat_messages").insert({
          thread_id: dbThreadId,
          sender: "user",
          text: text,
          time: timeNow,
        });
      }
    } catch (err) {
      console.warn("Supabase sendChatMessage error:", err);
    }

    // 3. Simulated Doctor Auto-reply synced to Supabase (1.2s delay)
    setTimeout(async () => {
      const docTime = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
      const docMsgId = `m-doc-${Date.now()}`;
      const replies = [
        `สวัสดีค่ะคุณ ${currentUser.fullName || "เจ้าของสัตว์เลี้ยง"} หมอได้รับข้อความแล้วนะคะ อาการของน้องเป็นอย่างไรบ้างคะ เล่าเพิ่มเติมให้หมอฟังได้เลยค่ะ 🩺🐾`,
        "ยินดีให้คำปรึกษาค่ะ อาการนี้แนะนำให้น้องดื่มน้ำสะอาดมากๆ และสังเกตว่ามีไข้หรือซึมลงไหมนะคะ",
        "หมอตรวจดูข้อมูลแล้วนะคะ หากมีอาการผิดปกติ สามารถจองคิวตรวจรักษาที่คลินิกผ่านแอปได้ทันทีเลยค่ะ",
        "คุณหมอรับทราบข้อมูลแล้วค่ะ หากมีรูปภาพหรือวิดีโออาการของน้อง สามารถส่งมาให้หมอดูประกอบการวินิจฉัยได้เลยนะคะ 🐱🐶",
      ];
      const replyText = replies[Math.floor(Math.random() * replies.length)];

      setChatThreads((p) => {
        const updated = p.map((t) => {
          if (t.id === threadId) {
            return {
              ...t,
              lastMessage: replyText,
              unreadCount: t.unreadCount + 1,
              messages: [
                ...t.messages,
                {
                  id: docMsgId,
                  sender: "doctor" as const,
                  text: replyText,
                  time: docTime,
                },
              ],
            };
          }
          return t;
        });
        try {
          localStorage.setItem("petmily_chat_threads", JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });

      // Persist doctor reply to Supabase
      try {
        if (dbThreadId) {
          await supabase.from("chat_messages").insert({
            thread_id: dbThreadId,
            sender: "doctor",
            text: replyText,
            time: docTime,
          });

          await supabase
            .from("chat_threads")
            .update({
              last_message: replyText,
              updated_at: new Date().toISOString(),
            })
            .eq("id", dbThreadId);

          await addNotification({
            title: `ข้อความตอบกลับจาก ${targetThread?.doctorName || "สัตวแพทย์"} 💬`,
            message: replyText,
            time: docTime,
            unread: true,
          });
        }
      } catch (err) {
        console.warn("Supabase doctor reply sync error:", err);
      }
    }, 1200);
  };

  const fetchChatMessages = async (threadId: string) => {
    try {
      const dbThreadId =
        DOCTOR_UUID_MAP[threadId] ||
        (threadId.includes("-") && threadId.length === 36 ? threadId : DOCTOR_UUID_MAP["vet-1"]);

      if (!dbThreadId) return;

      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("thread_id", dbThreadId)
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        setChatThreads((prev) => {
          const updated = prev.map((thread) => {
            if (thread.id === threadId) {
              const remoteMsgs = data.map((d: any) => ({
                id: d.id,
                sender: d.sender as "user" | "doctor",
                text: d.text,
                time: d.time || "เมื่อสักครู่",
              }));

              // Preserve first doctor welcome greeting if not present in remote
              const firstDoctorMsg = thread.messages.find((m) => m.sender === "doctor");
              const hasDoctorMsgInRemote = remoteMsgs.some((m: any) => m.sender === "doctor");

              const baseList =
                firstDoctorMsg && !hasDoctorMsgInRemote
                  ? [firstDoctorMsg, ...remoteMsgs]
                  : remoteMsgs;

              // De-duplicate
              const merged: typeof baseList = [];
              for (const m of baseList) {
                const already = merged.some(
                  (item) => item.id === m.id || (item.text === m.text && item.sender === m.sender)
                );
                if (!already) {
                  merged.push(m);
                }
              }

              return {
                ...thread,
                lastMessage:
                  merged[merged.length - 1]?.text || thread.lastMessage,
                messages: merged,
              };
            }
            return thread;
          });

          try {
            localStorage.setItem("petmily_chat_threads", JSON.stringify(updated));
          } catch (e) {}

          return updated;
        });
      }
    } catch (err) {
      console.warn("fetchChatMessages error:", err);
    }
  };

  const clearUnread = (threadId: string) => {
    setChatThreads((prev) => {
      const updated = prev.map((thread) => (thread.id === threadId ? { ...thread, unreadCount: 0 } : thread));
      try {
        localStorage.setItem("petmily_chat_threads", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateVetPatient = (id: string, updates: Partial<VetPatient>) => {
    setVetPatients((prev) =>
      prev.map((pat) => (pat.id === id ? { ...pat, ...updates } : pat))
    );
  };

  const fetchAppointments = async (targetUser?: UserProfile) => {
    try {
      const user = targetUser || currentUser;
      // If no user is logged in or user has no name / email / id / phone, no appointments should be shown
      if (!user || (!user.fullName?.trim() && !user.email?.trim() && !user.id && !user.phone?.trim())) {
        setAppointments([]);
        try {
          localStorage.removeItem("petmily_appointments");
        } catch (e) {}
        return;
      }

      let query = supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: false });

      if (user.role === "vet") {
        if (user.clinicName?.trim()) {
          query = query.eq("clinic_name", user.clinicName.trim());
        } else if (user.fullName?.trim()) {
          query = query.or(`doctor_name.ilike.%${user.fullName.trim()}%,clinic_name.ilike.%${user.fullName.trim()}%`);
        }
      } else {
        // Normal user: ONLY fetch appointments booked by/for this specific user
        const orConditions: string[] = [];
        if (user.id) {
          orConditions.push(`user_id.eq.${user.id}`);
        }
        if (user.fullName && user.fullName.trim()) {
          orConditions.push(`owner_name.eq.${user.fullName.trim()}`);
        }
        if (user.phone && user.phone.trim()) {
          orConditions.push(`phone.eq.${user.phone.trim()}`);
        }

        if (orConditions.length > 0) {
          query = query.or(orConditions.join(","));
        } else {
          setAppointments([]);
          return;
        }
      }

      const { data, error } = await query;

      if (!error && data) {
        const fetchedApps: Appointment[] = data.map((row: any) => ({
          id: row.id,
          clinicName: row.clinic_name || "โรงพยาบาลสัตว์",
          doctorName: row.doctor_name || "สัตวแพทย์ประจำเวร",
          serviceType: row.service_type || "ตรวจรักษา",
          date: row.appointment_date || new Date().toISOString().split("T")[0],
          time: row.appointment_time || "10:00 - 11:00 น.",
          ownerName: row.owner_name || user.fullName || "ผู้จอง",
          petName: row.pet_name || (selectedPet ? selectedPet.name : "สัตว์เลี้ยง"),
          petType: "cat",
          phone: row.phone || user.phone || "-",
          status: row.status === "confirmed" ? "ยืนยันแล้ว" : (row.status || "ยืนยันแล้ว"),
          notes: row.note || "",
          fee: "฿450.00",
        }));

        setAppointments(fetchedApps);
        try {
          localStorage.setItem("petmily_appointments", JSON.stringify(fetchedApps));
        } catch (e) {}
      } else {
        setAppointments([]);
      }
    } catch (e) {
      console.warn("Supabase fetch appointments error:", e);
    }
  };

  const addAppointment = async (app: Omit<Appointment, "id">) => {
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

    // Format valid date for Postgres DATE column
    let validDate = app.date;
    if (!validDate || !/^\d{4}-\d{2}-\d{2}$/.test(validDate)) {
      validDate = new Date().toISOString().split("T")[0];
    }

    try {
      const payload: any = {
        clinic_name: app.clinicName,
        doctor_name: app.doctorName,
        service_type: app.serviceType,
        appointment_date: validDate,
        appointment_time: app.time,
        owner_name: app.ownerName || currentUser.fullName || "ผู้ใช้งาน",
        pet_name: app.petName,
        phone: app.phone || currentUser.phone || "-",
        note: app.notes || "",
        status: "confirmed",
      };

      if (currentUser.id) {
        payload.user_id = currentUser.id;
      }

      const { data, error } = await supabase
        .from("appointments")
        .insert(payload)
        .select();

      if (data && data[0]?.id) {
        setAppointments((prev) => {
          const updated = prev.map((item) => (item.id === newApp.id ? { ...item, id: data[0].id } : item));
          try {
            localStorage.setItem("petmily_appointments", JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
      }
      if (error) {
        console.warn("Supabase insert appointment warning:", error.message);
      }
    } catch (err) {
      console.warn("Supabase insert appointment error:", err);
    }
  };

  const fetchPets = async (targetUser?: UserProfile) => {
    try {
      const user = targetUser || currentUser;
      if (!user || (!user.fullName?.trim() && !user.email?.trim() && !user.id)) {
        setPets([]);
        try { localStorage.removeItem("petmily_pets"); } catch {}
        return;
      }

      const orConds: string[] = [];
      if (user.id) orConds.push(`user_id.eq.${user.id}`);
      if (user.fullName?.trim()) orConds.push(`owner_name.eq.${user.fullName.trim()}`);

      let query = supabase.from("pets").select("*").order("created_at", { ascending: true });
      if (orConds.length > 0) {
        query = query.or(orConds.join(","));
      } else {
        setPets([]);
        return;
      }

      const { data, error } = await query;
      if (!error && data) {
        const dbPets: Pet[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          type: p.type || "cat",
          breed: p.breed || "",
          birthdate: p.birthdate || "",
          age: p.age || "",
          weight: p.weight || "-",
          height: p.height || "-",
          drugAllergy: p.drug_allergy || "ไม่มี",
          avatar: p.avatar || "cat",
          photoUrl:
            p.avatar?.startsWith("http") || p.avatar?.startsWith("data:")
              ? p.avatar
              : undefined,
          ownerName: p.owner_name || user.fullName || "ผู้ใช้งาน",
          latestVaccine: p.latest_vaccine || "",
        }));

        setPets(dbPets);
        try {
          localStorage.setItem("petmily_pets", JSON.stringify(dbPets));
        } catch {}
      } else {
        setPets([]);
      }
    } catch (e) {
      console.warn("fetchPets error:", e);
    }
  };

  const fetchExpenses = async (targetUser?: UserProfile) => {
    try {
      const user = targetUser || currentUser;
      if (!user || (!user.fullName?.trim() && !user.email?.trim() && !user.id)) {
        setExpenses([]);
        try { localStorage.removeItem("petmily_expenses"); } catch {}
        return;
      }

      let query = supabase.from("expenses").select("*").order("date", { ascending: false });
      if (user.id) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const mappedExpenses: ExpenseItem[] = data.map((e: any) => ({
          id: e.id,
          title: e.title,
          amount: Number(e.amount) || 0,
          category: e.category || "อื่นๆ",
          date: e.date || new Date().toISOString().split("T")[0],
        }));
        setExpenses(mappedExpenses);
        try {
          localStorage.setItem("petmily_expenses", JSON.stringify(mappedExpenses));
        } catch {}
      }
    } catch (e) {
      console.warn("fetchExpenses error:", e);
    }
  };

  const fetchNotifications = async (targetUser?: UserProfile) => {
    try {
      const user = targetUser || currentUser;
      if (!user || (!user.fullName?.trim() && !user.email?.trim() && !user.id)) {
        setNotifications([]);
        try { localStorage.removeItem("petmily_notifications"); } catch {}
        return;
      }

      let query = supabase.from("notifications").select("*").order("created_at", { ascending: false });
      if (user.id) {
        query = query.or(`user_id.eq.${user.id},user_id.is.null`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const remoteNotifs: NotificationItem[] = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          message: d.message,
          time: d.time || "เมื่อสักครู่",
          unread: d.unread !== undefined ? d.unread : true,
        }));
        setNotifications(remoteNotifs);
        try {
          localStorage.setItem("petmily_notifications", JSON.stringify(remoteNotifs));
        } catch {}
      }
    } catch (err) {
      console.warn("fetchNotifications error:", err);
    }
  };

  const addNotification = async (item: Omit<NotificationItem, "id">) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `n-${Date.now()}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    try {
      const payload: any = {
        title: item.title,
        message: item.message,
        time: item.time,
        unread: item.unread ?? true,
      };
      if (currentUser.id) {
        payload.user_id = currentUser.id;
      }
      await supabase.from("notifications").insert(payload);
    } catch (err) {
      console.warn("Supabase insert notification warning:", err);
    }
  };

  const syncWithSupabase = async (targetUser?: UserProfile) => {
    try {
      const user = targetUser || currentUser;
      if (user && (user.fullName?.trim() || user.email?.trim() || user.id || user.phone?.trim())) {
        // Check profile premium status from Supabase
        if (user.email?.trim() || user.id) {
          try {
            let profQuery = supabase.from("profiles").select("is_premium, full_name, role");
            if (user.id) {
              profQuery = profQuery.eq("id", user.id);
            } else if (user.email?.trim()) {
              profQuery = profQuery.eq("email", user.email.trim());
            }
            const { data: prof } = await profQuery.maybeSingle();
            if (prof?.is_premium) {
              setIsPremium(true);
              try {
                localStorage.setItem("petmily_is_premium", "true");
              } catch {}
            }
          } catch (e) {}
        }

        await fetchPets(user);
        await fetchAppointments(user);
        await fetchExpenses(user);
        await fetchNotifications(user);
        if (isPremium) {
          await fetchChatMessages("vet-1");
          await fetchChatMessages("vet-2");
          await fetchChatMessages("vet-3");
        }
      } else {
        setPets([]);
        setAppointments([]);
        setExpenses([]);
        setNotifications([]);
      }
    } catch (err) {
      console.warn("syncWithSupabase error:", err);
    }
  };

  // Run Supabase sync on mount
  useEffect(() => {
    syncWithSupabase();
  }, []);

  const addExpense = (exp: Omit<ExpenseItem, "id">) => {
    const newExp: ExpenseItem = {
      ...exp,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => {
      const updated = [newExp, ...prev];
      try {
        localStorage.setItem("petmily_expenses", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    const expensePayload: any = {
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date || new Date().toISOString().split("T")[0],
    };
    if (currentUser.id) {
      expensePayload.user_id = currentUser.id;
    }
    supabase.from("expenses").insert(expensePayload).then();
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => {
      const updated = prev.filter((exp) => exp.id !== id);
      try {
        localStorage.setItem("petmily_expenses", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (!id.startsWith("exp-")) {
      supabase.from("expenses").delete().eq("id", id).then();
    }
  };

  const clearNotifications = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    try {
      await supabase
        .from("notifications")
        .update({ unread: false })
        .neq("id", "00000000-0000-0000-0000-000000000000");
    } catch (err) {}
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
        upgradeToPremium,
        pets,
        selectedPetIndex,
        setSelectedPetIndex,
        selectedPet,
        addPet,
        activityButtons,
        addActivityButton,
        removeActivityButton,
        activityLogs,
        logActivity,
        removeActivityLog,
        chatThreads,
        setChatThreads,
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
        fetchNotifications,
        addNotification,
        resetForNewUser,
        themeMode,
        setThemeMode,
        toggleTheme,
        fetchAppointments,
        fetchPets,
        fetchExpenses,
        fetchChatMessages,
        syncWithSupabase,
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

"use client";

import React, { createContext, useContext, useState } from "react";
import { supabase } from "./supabaseClient";

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
  avatar: "cat" | "dog";
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

interface PetContextType {
  userRole: "user" | "vet";
  setUserRole: (role: "user" | "vet") => void;
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
  resetForNewUser: () => void;
}

const defaultActivityButtons: ActivityButton[] = [
  { id: "food", name: "อาหาร", emoji: "🍲", type: "food", badgeDotColor: "#10B981" },
  { id: "poop", name: "ขับถ่าย", emoji: "💩", type: "poop" },
  { id: "walk", name: "เดินเล่น", emoji: "🐕", type: "walk" },
  { id: "bath", name: "อาบน้ำ", emoji: "🛁", type: "bath" },
];

const defaultActivityLogs: ActivityLog[] = [
  {
    id: "log-1",
    petId: "pet-1",
    type: "food",
    title: "ทานอาหารเช้า (อาหารเปียก)",
    emoji: "🍲",
    time: "08:30 น.",
    note: "ทานหมดเกลี้ยง",
  },
  {
    id: "log-2",
    petId: "pet-1",
    type: "poop",
    title: "ขับถ่ายช่วงเช้า",
    emoji: "💩",
    time: "09:15 น.",
    note: "ปกติ ไม่เหลว",
  },
];

const defaultPets: Pet[] = [
  {
    id: "pet-1",
    name: "นามิ (Nami)",
    type: "แมว",
    breed: "สกอตติช โฟลด์",
    birthdate: "2024-03-15",
    age: "1 ปี 2 เดือน",
    weight: "5.5",
    height: "25 ซม.",
    drugAllergy: "ไม่มีประวัติแพ้ยา",
    avatar: "cat",
    ownerName: "คุณนามิ",
    latestVaccine: "12 พ.ค. 2026",
  },
  {
    id: "pet-2",
    name: "ลักกี้ (Lucky)",
    type: "สุนัข",
    breed: "โกลเด้น รีทรีฟเวอร์",
    birthdate: "2023-08-10",
    age: "2 ปี 5 เดือน",
    weight: "28.4",
    height: "58 ซม.",
    drugAllergy: "แพ้ยาเพนิซิลลิน",
    avatar: "dog",
    ownerName: "คุณนามิ",
    latestVaccine: "18 ม.ค. 2026",
  },
];

const defaultVetPatients: VetPatient[] = [
  {
    id: "pat-1",
    ownerName: "คุณโชกิ",
    petName: "โชกิ",
    isVIP: true,
    avatarType: "shoki",
    lastVaccine: "12 ม.ค. 2026",
    weight: "4.5 กก. ปกติ",
    checked: true,
    lastMessage: "สวัสดีครับ คุณหมอ ขอจองลัดคิวค่ะ",
    unreadCount: 8,
  },
  {
    id: "pat-2",
    ownerName: "คุณเริงแมว",
    petName: "เริงแมว",
    isVIP: true,
    avatarType: "reangmaew",
    lastVaccine: "30 ส.ค. 2026",
    weight: "-",
    checked: false,
    lastMessage: "ขอจองคิวค่ะ",
    unreadCount: 5,
  },
  {
    id: "pat-3",
    ownerName: "คุณตุ๊กแก",
    petName: "ตุ๊กแก",
    isVIP: false,
    avatarType: "tookae",
    lastVaccine: "22 ส.ค. 2026",
    weight: "-",
    checked: false,
    lastMessage: "น้องเจ็บที่เท้าค่ะ เป็นอะไรไหมคะ",
    unreadCount: 2,
  },
];

const defaultChats: ChatThread[] = [
  {
    id: "vet-1",
    doctorName: "แพทย์หญิงด้า",
    avatarType: "da",
    lastMessage: "วันนี้มีนัดพบหมอนะค่ะ",
    unreadCount: 5,
    clinicName: "นีเน่แคร์เซ็นเตอร์",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "doctor",
        text: "สวัสดีค่ะคุณนามิ วันนี้มีนัดพบหมอนะค่ะ เวลา 10:00 น. ที่คลินิกนีเน่แคร์เซ็นเตอร์",
        time: "08:30",
      },
      {
        id: "m2",
        sender: "doctor",
        text: "อย่าลืมนำสมุดวัคซีนของน้องมิลค์กี้มาด้วยนะคะ",
        time: "08:32",
      },
    ],
  },
  {
    id: "vet-2",
    doctorName: "แพทย์หญิงโดนัท",
    avatarType: "donut",
    lastMessage: "ขอนัดอีกวันนะค่ะ",
    unreadCount: 2,
    clinicName: "คลินิกรักษ์สัตว์",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "คุณหมอคะ วันเสาร์นี้น้องมีอาการซึมๆ อยากพาไปตรวจค่ะ",
        time: "เมื่อวาน 15:20",
      },
      {
        id: "m2",
        sender: "doctor",
        text: "สวัสดีค่ะ พอดีเสาร์นี้คิวตรวจเต็มแล้วค่ะ ขอนัดอีกวันนะค่ะ เป็นวันอาทิตย์ช่วง 14:00 น. สะดวกไหมคะ?",
        time: "เมื่อวาน 16:00",
      },
    ],
  },
  {
    id: "vet-3",
    doctorName: "นพ. วีรพล ธนภูมิ",
    avatarType: "veerapon",
    lastMessage: "สวัสดีครับ คุณนามิมีอาการอื่นอีกไหมครับ",
    unreadCount: 8,
    clinicName: "โรงพยาบาลสัตว์ท่าสะอ้าน",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "doctor",
        text: "สวัสดีครับ คุณนามิมีอาการอื่นอีกไหมครับ หลังจากทานยาแก้อักเสบไปเมื่อคืน?",
        time: "09:15",
      },
    ],
  },
];

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<"user" | "vet">("user");
  const [pets, setPets] = useState<Pet[]>(defaultPets);
  const [selectedPetIndex, setSelectedPetIndex] = useState<number>(0);
  const [activityButtons, setActivityButtons] = useState<ActivityButton[]>(defaultActivityButtons);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(defaultActivityLogs);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(defaultChats);
  const [vetPatients, setVetPatients] = useState<VetPatient[]>(defaultVetPatients);

  // Fetch remote records from Supabase on mount
  React.useEffect(() => {
    async function loadSupabaseData() {
      try {
        const { data: dbPets } = await supabase.from("pets").select("*");
        if (dbPets && dbPets.length > 0) {
          const mappedPets: Pet[] = dbPets.map((p) => ({
            id: p.id,
            name: p.name,
            type: p.type || "แมว",
            breed: p.breed || "",
            birthdate: p.birthdate || "",
            age: p.age || "",
            weight: p.weight || "",
            height: p.height || "",
            drugAllergy: p.drug_allergy || "ไม่มีประวัติแพ้ยา",
            avatar: (p.avatar === "dog" ? "dog" : "cat") as "cat" | "dog",
            ownerName: p.owner_name || "คุณนามิ",
            latestVaccine: p.latest_vaccine || "12 พ.ค. 2026",
          }));
          setPets((prev) => [...mappedPets, ...prev.filter((item) => !mappedPets.some((mp) => mp.id === item.id))]);
        }

        const { data: dbLogs } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false });
        if (dbLogs && dbLogs.length > 0) {
          const mappedLogs: ActivityLog[] = dbLogs.map((l) => ({
            id: l.id,
            petId: l.pet_id || "pet-1",
            type: l.type,
            title: l.title,
            emoji: l.emoji || "✨",
            time: l.time || "เมื่อสักครู่",
            note: l.note || "",
          }));
          setActivityLogs((prev) => [...mappedLogs, ...prev.filter((item) => !mappedLogs.some((ml) => ml.id === item.id))]);
        }
      } catch (err) {
        console.warn("Supabase fetch notice:", err);
      }
    }
    loadSupabaseData();
  }, []);

   const selectedPet = pets[selectedPetIndex] || pets[0] || {
    id: "pet-new",
    name: "สัตว์เลี้ยงของฉัน",
    type: "แมว",
    breed: "-",
    birthdate: "",
    age: "-",
    weight: "-",
    height: "-",
    drugAllergy: "ไม่มีประวัติแพ้ยา",
    avatar: "cat",
    ownerName: "คุณนามิ",
    latestVaccine: "-",
  };

  const resetForNewUser = () => {
    setPets([]);
    setSelectedPetIndex(0);
    setActivityLogs([]);
  };

  const addPet = (newPetData: Omit<Pet, "id">) => {
    const newPet: Pet = {
      ...newPetData,
      id: `pet-${Date.now()}`,
    };
    setPets((prev) => {
      const updated = [...prev, newPet];
      setSelectedPetIndex(updated.length - 1);
      return updated;
    });

    // Sync to Supabase
    supabase.from("pets").insert({
      name: newPetData.name,
      type: newPetData.type,
      breed: newPetData.breed,
      birthdate: newPetData.birthdate || null,
      age: newPetData.age,
      weight: newPetData.weight,
      height: newPetData.height,
      drug_allergy: newPetData.drugAllergy,
      avatar: newPetData.avatar,
      owner_name: newPetData.ownerName,
      latest_vaccine: newPetData.latestVaccine,
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

    // Sync to Supabase
    supabase.from("activity_buttons").insert({
      name: btn.name,
      emoji: btn.emoji,
      type: btn.type,
      badge_dot_color: btn.badgeDotColor || null,
    }).then(({ error }) => {
      if (error) console.warn("Supabase insert button error:", error.message);
    });
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

    // Sync to Supabase
    supabase.from("activity_logs").insert({
      pet_id: selectedPet?.id && selectedPet.id.includes("-") ? null : selectedPet?.id,
      type,
      title,
      emoji,
      time: timeNow,
      note: note || "",
    }).then(({ error }) => {
      if (error) console.warn("Supabase insert log error:", error.message);
    });
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

  return (
    <PetContext.Provider
      value={{
        userRole,
        setUserRole,
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


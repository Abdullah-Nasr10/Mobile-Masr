import { createContext, useState, useEffect } from "react";
import { askAI } from "../services/aiApi";

export const AiContext = createContext();

export const AiProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsUsed, setProductsUsed] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  // الترحيب عند التحميل
  useEffect(() => {
    const initializeAI = async () => {
      const userData = localStorage.getItem("user");
      let parsedUser = null;
      
      if (userData) {
        try {
          parsedUser = JSON.parse(userData);
          setUserInfo(parsedUser);
        } catch (e) {
          console.log("Error reading user data");
        }
      }

      // تحميل الرسائل القديمة إن وجدت
      const savedMessages = localStorage.getItem("chatMessages");
      if (savedMessages) {
        try {
          const oldMessages = JSON.parse(savedMessages);
          
          // التأكد من أن الرسائل صالحة
          if (Array.isArray(oldMessages) && oldMessages.length > 0) {
            setMessages(oldMessages);
            return;
          }
        } catch (e) {
          console.log("Error loading old messages");
        }
      }

      // إذا لم يكن هناك رسائل محفوظة، ابدأ بقائمة فارغة
      setMessages([]);
    };

    initializeAI();
  }, []);

  // مراقبة تغيير بيانات المستخدم في localStorage
  useEffect(() => {
    const handleUserChange = (event) => {
      const userData = event.detail || localStorage.getItem("user");
      if (userData && typeof userData === 'string') {
        try {
          const parsedUser = JSON.parse(userData);
          setUserInfo(parsedUser);
          // عند اللوجين: مسح المحادثة القديمة
          setMessages([]);
          localStorage.removeItem("chatMessages");
        } catch (e) {
          console.log("Error parsing user data");
        }
      } else if (userData && typeof userData === 'object') {
        setUserInfo(userData);
        // عند اللوجين: مسح المحادثة القديمة
        setMessages([]);
        localStorage.removeItem("chatMessages");
      } else {
        // عند اللوج أوت: مسح كل شيء
        setUserInfo(null);
        setMessages([]);
        localStorage.removeItem("chatMessages");
      }
    };

    // الاستماع للحدث المخصص
    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  const callAI = async (feature, question, extra = {}) => {
    if (!question.trim()) return;

    setLoading(true);

    // Add user message
    const userMessage = {
      type: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };
    
    // Build conversation history (last 6 messages for context)
    const historyToSend = [...messages, userMessage]
      .slice(-6)
      .map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content
    }));
    
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await askAI(feature, question, {
        userId: userInfo?._id,
        history: historyToSend,
        ...extra,
      });

      // Add AI message
      const aiMessage = {
        type: "ai",
        content: res.answer,
        timestamp: new Date().toISOString(),
        products: res.productsSuggested || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
      setProductsUsed(res.productsUsed || 0);
    } catch (e) {
      const errorMessage = {
        type: "ai",
        content: "Sorry, something went wrong. Please try again 😢",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  const saveMessages = () => {
    if (messages.length > 0) {
      // حفظ فقط آخر 10 رسالة لتجنب ملء الذاكرة
      const messagesToSave = messages.slice(-10);
      localStorage.setItem("chatMessages", JSON.stringify(messagesToSave));
    }
  };

  const addGreeting = () => {
    const name = userInfo?.name || userInfo?.firstName;
    const content = name
      ? `Hi ${name}! 👋 How can I help you today?`
      : `Welcome! 👋 Log in for better assistance!`;
    const msg = {
      type: "ai",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => {
      const next = [...prev, msg];
      localStorage.setItem("chatMessages", JSON.stringify(next.slice(-30)));
      localStorage.setItem("lastGreetingAt", Date.now().toString());
      return next;
    });
  };

  return (
    <AiContext.Provider
      value={{ 
        messages, 
        loading, 
        productsUsed, 
        callAI, 
        clearMessages,
        saveMessages,
        addGreeting,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </AiContext.Provider>
  );
};

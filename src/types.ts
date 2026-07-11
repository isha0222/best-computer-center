export interface StudentCertificate {
  id: string;
  rollNo: string;
  name: string;
  course: string;
  duration: string;
  status: string;
}

export interface CourseInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  createdAt: string;
  status: string; // 'New', 'Contacted', 'Closed'
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: string; // 'Unread', 'Read'
}

export interface CourseDetail {
  id: string;
  title: string;
  duration: string;
  fees: string;
  image: string;
  description: string;
  content: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: string;
}

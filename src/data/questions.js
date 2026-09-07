export const questions = [
  {
    id: 1,
    question: "What is Amazon EC2?",
    options: [
      "A cloud storage service",
      "A virtual server service",
      "A database service",
      "A DNS service"
    ],
    correctOption: "A virtual server service",
    reason: "Amazon EC2 provides resizable compute capacity (virtual servers) in the AWS Cloud.",
    difficulty: "Easy",
    certification: "AWS Cloud Practitioner",
    concept: "Amazon EC2"
  },
  {
    id: 2,
    question: "Which AWS service is a managed relational database service?",
    options: [
      "Amazon DynamoDB",
      "Amazon RDS",
      "Amazon Redshift",
      "Amazon ElastiCache"
    ],
    correctOption: "Amazon RDS",
    reason: "Amazon Relational Database Service (Amazon RDS) is a managed relational database service that supports multiple database engines like MySQL, PostgreSQL, Oracle, SQL Server, etc.",
    difficulty: "Easy",
    certification: "AWS Cloud Practitioner",
    concept: "Amazon RDS"
  },
  {
    id: 3,
    question: "What does Amazon S3 stand for?",
    options: [
      "Simple System Server",
      "Simple Storage Service",
      "Secure Storage System",
      "Solid State Storage"
    ],
    correctOption: "Simple Storage Service",
    reason: "Amazon S3 stands for Simple Storage Service, which is an object storage service offering industry-leading scalability, data availability, security, and performance.",
    difficulty: "Easy",
    certification: "AWS Cloud Practitioner",
    concept: "Amazon S3"
  },
  {
    id: 4,
    question: "Which of the following is a key feature of Amazon DynamoDB?",
    options: [
      "It is a relational database with SQL support",
      "It is a serverless, NoSQL database with single-digit millisecond latency",
      "It is designed solely for data warehousing",
      "It requires manual server provisioning"
    ],
    correctOption: "It is a serverless, NoSQL database with single-digit millisecond latency",
    reason: "Amazon DynamoDB is a fully managed, serverless NoSQL database service that provides fast, predictable performance with seamless scalability.",
    difficulty: "Medium",
    certification: "AWS Solutions Architect Associate",
    concept: "Amazon DynamoDB"
  },
  {
    id: 5,
    question: "What is the primary benefit of using Amazon CloudFront?",
    options: [
      "Hosting SQL databases",
      "Delivering content with low latency and high transfer speeds globally",
      "Monitoring EC2 performance",
      "Auto-scaling EC2 instances"
    ],
    correctOption: "Delivering content with low latency and high transfer speeds globally",
    reason: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency.",
    difficulty: "Medium",
    certification: "AWS Cloud Practitioner",
    concept: "Amazon CloudFront"
  },
  {
    id: 6,
    question: "An application requires highly available object storage that guarantees 99.999999999% (11 nines) of durability. Which service should you choose?",
    options: [
      "Amazon EBS",
      "Amazon S3",
      "Amazon EFS",
      "Amazon Instance Store"
    ],
    correctOption: "Amazon S3",
    reason: "Amazon S3 is designed for 99.999999999% durability of objects by storing copies of objects across multiple distinct Availability Zones.",
    difficulty: "Medium",
    certification: "AWS Solutions Architect Associate",
    concept: "Amazon S3"
  },
  {
    id: 7,
    question: "How does Amazon Route 53 protect against DNS failures?",
    options: [
      "By automatically backing up files to S3",
      "By routing traffic to healthy endpoints using DNS health checks",
      "By deploying firewalls at edge locations",
      "By physical replication across continents"
    ],
    correctOption: "By routing traffic to healthy endpoints using DNS health checks",
    reason: "Amazon Route 53 can monitor the health of your application's endpoints, such as web servers, and route internet traffic only to healthy endpoints when a failure occurs.",
    difficulty: "Hard",
    certification: "AWS Solutions Architect Associate",
    concept: "Amazon Route 53"
  },
  {
    id: 8,
    question: "What is the main difference between Amazon EC2 and AWS Lambda?",
    options: [
      "EC2 is relational, whereas Lambda is NoSQL",
      "EC2 provides virtual servers where you manage the OS, while Lambda runs code serverless without server management",
      "EC2 can only run in one region, while Lambda runs globally",
      "EC2 is paid by the second, whereas Lambda is paid by the month"
    ],
    correctOption: "EC2 provides virtual servers where you manage the OS, while Lambda runs code serverless without server management",
    reason: "Amazon EC2 is an Infrastructure as a Service (IaaS) where you lease virtual machines and manage the underlying OS, while AWS Lambda is a serverless Function as a Service (FaaS) that executes code in response to events and automatically manages compute resources.",
    difficulty: "Easy",
    certification: "AWS Cloud Practitioner",
    concept: "AWS Lambda"
  }
];

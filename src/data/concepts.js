export const concepts = [
  {
    id: 1,
    conceptName: "Amazon EC2",
    concept: "Amazon Elastic Compute Cloud (Amazon EC2) provides scalable virtual servers in the AWS Cloud. It eliminates the need to invest in hardware up front, so you can develop and deploy applications faster. You can use Amazon EC2 to launch as many or as few virtual servers as you need, configure security and networking, and manage storage. It allows you to scale up or down to handle changes in requirements or spikes in popularity, reducing your need to forecast traffic. EC2 is considered Infrastructure as a Service (IaaS).",
    certification: "AWS Cloud Practitioner"
  },
  {
    id: 2,
    conceptName: "Amazon RDS",
    concept: "Amazon Relational Database Service (Amazon RDS) makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while automating time-consuming administration tasks such as hardware provisioning, database setup, patching, and backups. It supports popular database engines including Amazon Aurora, PostgreSQL, MySQL, MariaDB, Oracle Database, and Microsoft SQL Server.",
    certification: "AWS Cloud Practitioner"
  },
  {
    id: 3,
    conceptName: "Amazon S3",
    concept: "Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. This means customers of all sizes and industries can use it to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. S3 provides 99.999999999% (11 9s) of data durability by replicating data across multiple Availability Zones automatically.",
    certification: "AWS Cloud Practitioner"
  },
  {
    id: 4,
    conceptName: "Amazon DynamoDB",
    concept: "Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. DynamoDB lets you offload the administrative burdens of operating and scaling a distributed database so that you don't have to worry about hardware provisioning, setup and configuration, replication, software patching, or cluster scaling. It offers single-digit millisecond response times and built-in encryption at rest.",
    certification: "AWS Solutions Architect Associate"
  },
  {
    id: 5,
    conceptName: "Amazon CloudFront",
    concept: "Amazon CloudFront is a web service that speeds up distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users. CloudFront delivers your content through a worldwide network of data centers called edge locations. When a user requests content that you're serving with CloudFront, the request is routed to the edge location that provides the lowest latency (time delay), so that content is delivered with the best possible performance.",
    certification: "AWS Cloud Practitioner"
  },
  {
    id: 6,
    conceptName: "Amazon Route 53",
    concept: "Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. It is designed to give developers and businesses an extremely reliable and cost-effective way to route end users to internet applications by translating names like www.example.com into the numeric IP addresses like 192.0.2.1 that computers use to connect to each other. Route 53 is fully compliant with IPv6 as well. It also features Route 53 Traffic Flow, which lets you manage traffic globally through a variety of routing types, including Latency-based Routing, Geo DNS, Geoproximity, and Weighted Round Robin.",
    certification: "AWS Solutions Architect Associate"
  },
  {
    id: 7,
    conceptName: "AWS Lambda",
    concept: "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. Lambda executes your code only when needed and scales automatically, from a few requests per day to thousands per second. You pay only for the compute time you consume - there is no charge when your code is not running. Lambda supports multiple programming languages (including Node.js, Python, Java, Go, C#, Ruby, etc.) and integrates seamlessly with other AWS services like S3, DynamoDB, and API Gateway.",
    certification: "AWS Cloud Practitioner"
  }
];

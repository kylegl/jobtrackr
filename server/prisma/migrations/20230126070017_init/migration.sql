-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "position" TEXT NOT NULL,
    "isEmployed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workOrderId" TEXT,
    CONSTRAINT "employee_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "workOrder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT,
    "employeeId" TEXT,
    "workOrderId" TEXT,
    CONSTRAINT "contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "contact_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "workOrder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "gateCode" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "prevailingWage" BOOLEAN NOT NULL,
    "isHourly" BOOLEAN NOT NULL,
    "type" TEXT,
    "status" TEXT NOT NULL,
    "contractTotal" INTEGER,
    "invoicedTotal" INTEGER,
    "paidTotal" INTEGER,
    "hours" INTEGER,
    "startAt" DATETIME,
    "closedAt" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT,
    "contactId" TEXT,
    "propertyId" TEXT,
    CONSTRAINT "job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "job_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "job_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "number" INTEGER,
    "prevailingWage" BOOLEAN,
    "status" TEXT NOT NULL,
    "isHourly" BOOLEAN NOT NULL,
    "type" TEXT,
    "total" INTEGER,
    "sentAt" DATETIME,
    "closedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT,
    "contactId" TEXT,
    "propertyId" TEXT,
    "jobId" TEXT,
    CONSTRAINT "bid_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bid_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bid_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bid_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "materials" TEXT,
    "hours" INTEGER,
    "number" INTEGER NOT NULL,
    "startAt" DATETIME,
    "dueAt" DATETIME,
    "closedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workOrderId" TEXT,
    CONSTRAINT "task_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "workOrder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "isHourly" BOOLEAN NOT NULL,
    "type" TEXT,
    "startAt" DATETIME,
    "dueAt" DATETIME,
    "closedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "jobId" TEXT,
    "companyId" TEXT,
    CONSTRAINT "workOrder_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "workOrder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

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
    "isEmployed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "titleId" TEXT NOT NULL,
    CONSTRAINT "employee_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "jobTitle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "jobTitle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
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
    CONSTRAINT "contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "gateCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "isPrevailingWage" BOOLEAN NOT NULL,
    "isHourly" BOOLEAN NOT NULL,
    "contractTotal" INTEGER,
    "invoicedTotal" INTEGER,
    "paidTotal" INTEGER,
    "hours" INTEGER,
    "startAt" DATETIME,
    "dueAt" DATETIME,
    "closedAt" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "typeId" TEXT,
    "status" TEXT NOT NULL,
    "companyId" TEXT,
    "propertyId" TEXT,
    CONSTRAINT "job_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "jobType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "job_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "jobType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "bid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "number" INTEGER,
    "isPrevailingWage" BOOLEAN,
    "isHourly" BOOLEAN NOT NULL,
    "hours" INTEGER,
    "total" INTEGER,
    "sentAt" DATETIME,
    "dueAt" DATETIME,
    "closedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "propertyId" TEXT,
    "typeId" TEXT,
    "status" TEXT NOT NULL,
    CONSTRAINT "bid_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bid_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "jobType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "status" TEXT NOT NULL,
    "workOrderId" TEXT,
    CONSTRAINT "task_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "workOrder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "isHourly" BOOLEAN NOT NULL,
    "hours" INTEGER,
    "startAt" DATETIME,
    "dueAt" DATETIME,
    "closedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "jobId" TEXT,
    "companyId" TEXT,
    "status" TEXT NOT NULL,
    CONSTRAINT "workOrder_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "workOrder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_employeeToworkOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_employeeToworkOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_employeeToworkOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "workOrder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_contactTojob" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_contactTojob_A_fkey" FOREIGN KEY ("A") REFERENCES "contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_contactTojob_B_fkey" FOREIGN KEY ("B") REFERENCES "job" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_contactToworkOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_contactToworkOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_contactToworkOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "workOrder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_bidTocompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_bidTocompany_A_fkey" FOREIGN KEY ("A") REFERENCES "bid" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_bidTocompany_B_fkey" FOREIGN KEY ("B") REFERENCES "company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_bidTocontact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_bidTocontact_A_fkey" FOREIGN KEY ("A") REFERENCES "bid" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_bidTocontact_B_fkey" FOREIGN KEY ("B") REFERENCES "contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_bidTojob" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_bidTojob_A_fkey" FOREIGN KEY ("A") REFERENCES "bid" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_bidTojob_B_fkey" FOREIGN KEY ("B") REFERENCES "job" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "jobTitle_title_key" ON "jobTitle"("title");

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "job_name_key" ON "job"("name");

-- CreateIndex
CREATE UNIQUE INDEX "job_number_key" ON "job"("number");

-- CreateIndex
CREATE UNIQUE INDEX "jobType_name_key" ON "jobType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bid_name_key" ON "bid"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bid_number_key" ON "bid"("number");

-- CreateIndex
CREATE UNIQUE INDEX "workOrder_number_key" ON "workOrder"("number");

-- CreateIndex
CREATE UNIQUE INDEX "_employeeToworkOrder_AB_unique" ON "_employeeToworkOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_employeeToworkOrder_B_index" ON "_employeeToworkOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_contactTojob_AB_unique" ON "_contactTojob"("A", "B");

-- CreateIndex
CREATE INDEX "_contactTojob_B_index" ON "_contactTojob"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_contactToworkOrder_AB_unique" ON "_contactToworkOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_contactToworkOrder_B_index" ON "_contactToworkOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bidTocompany_AB_unique" ON "_bidTocompany"("A", "B");

-- CreateIndex
CREATE INDEX "_bidTocompany_B_index" ON "_bidTocompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bidTocontact_AB_unique" ON "_bidTocontact"("A", "B");

-- CreateIndex
CREATE INDEX "_bidTocontact_B_index" ON "_bidTocontact"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bidTojob_AB_unique" ON "_bidTojob"("A", "B");

-- CreateIndex
CREATE INDEX "_bidTojob_B_index" ON "_bidTojob"("B");

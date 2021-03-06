USE [EmpDb]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 2020-08-22 11:57:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 2020-08-22 11:57:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[RoleID] [int] NULL,
	[ManagerID] [int] NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 2020-08-22 11:57:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](50) NULL,
	[Salary] [float] NULL,
	[DepartmentID] [int] NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([Id], [Name]) VALUES (1, N'Sales')
INSERT [dbo].[Department] ([Id], [Name]) VALUES (2, N'Engineering')
INSERT [dbo].[Department] ([Id], [Name]) VALUES (3, N'Finance')
INSERT [dbo].[Department] ([Id], [Name]) VALUES (4, N'Legal')
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[Employee] ON 

INSERT [dbo].[Employee] ([Id], [FirstName], [LastName], [RoleID], [ManagerID]) VALUES (1, N'Mark', N'Sanders', 1, 2)
INSERT [dbo].[Employee] ([Id], [FirstName], [LastName], [RoleID], [ManagerID]) VALUES (2, N'Jamees', N'LOOs', 3, 2)
INSERT [dbo].[Employee] ([Id], [FirstName], [LastName], [RoleID], [ManagerID]) VALUES (3, N'Mathew', N'Sol', 3, 1)
INSERT [dbo].[Employee] ([Id], [FirstName], [LastName], [RoleID], [ManagerID]) VALUES (4, N'Robin', N'Suliven', 2, 2)
INSERT [dbo].[Employee] ([Id], [FirstName], [LastName], [RoleID], [ManagerID]) VALUES (7, N'Mehdi', N'Jalal', 1, 1)
INSERT [dbo].[Employee] ([Id], [FirstName], [LastName], [RoleID], [ManagerID]) VALUES (8, N'Jano', N'Bano', 2, 2)
INSERT [dbo].[Employee] ([Id], [FirstName], [LastName], [RoleID], [ManagerID]) VALUES (9, N'Robin33', N'Vol33', 2, 1)
SET IDENTITY_INSERT [dbo].[Employee] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([Id], [Title], [Salary], [DepartmentID]) VALUES (1, N'Software Engineer', 150000, 1)
INSERT [dbo].[Role] ([Id], [Title], [Salary], [DepartmentID]) VALUES (2, N'Admin Officer', 80000, 2)
INSERT [dbo].[Role] ([Id], [Title], [Salary], [DepartmentID]) VALUES (3, N'Receiption', 45000, 1)
INSERT [dbo].[Role] ([Id], [Title], [Salary], [DepartmentID]) VALUES (4, N'Engineer', 100000, 3)
INSERT [dbo].[Role] ([Id], [Title], [Salary], [DepartmentID]) VALUES (6, N'Sales Manager', 49000, 3)
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([Id])
GO
ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_Role]
GO

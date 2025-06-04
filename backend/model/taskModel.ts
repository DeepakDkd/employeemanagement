// Sequelize Task Model compatible with PostgreSQL
import { DataTypes, Model, Sequelize } from "sequelize";
import { ITask } from "../types/task";

export class Task extends Model<ITask> implements ITask {
  public id!: number;
    public title!: string;
    public description!: string;
    public status!: "pending" | "in-progress" | "completed";
    public priority!: "low" | "medium" | "high";   
}

export const createTaskModel = (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      assignedTo: {
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
      projectId: {
        type: DataTypes.INTEGER,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      labels: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      comments: {
        type: DataTypes.JSONB,
      },
      attachments: {
        type: DataTypes.JSONB,
      },
      estimatedTime: {
        type: DataTypes.FLOAT,
      },
      actualTime: {
        type: DataTypes.FLOAT,
      },
      isTimeTracked: {
        type: DataTypes.BOOLEAN,
      },
      timeLogs: {
        type: DataTypes.JSONB,
      },
      progress: {
        type: DataTypes.FLOAT,
      },
      dependencies: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      isRecurring: {
        type: DataTypes.BOOLEAN,
      },
      recurrencePattern: {
        type: DataTypes.JSONB,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
      },
      isArchivedBy: {
        type: DataTypes.INTEGER,
      },
      archivedAt: {
        type: DataTypes.DATE,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
      },
      isDeletedBy: {
        type: DataTypes.INTEGER,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      isRestored: {
        type: DataTypes.BOOLEAN,
      },
      restoredBy: {
        type: DataTypes.INTEGER,
      },
      restoredAt: {
        type: DataTypes.DATE,
      },
      parentTaskId: {
        type: DataTypes.INTEGER,
      },
      isReviewed: {
        type: DataTypes.BOOLEAN,
      },
      reviewComments: {
        type: DataTypes.JSONB,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
      },
      approvalComments: {
        type: DataTypes.JSONB,
      },
      isVisibleToClient: {
        type: DataTypes.BOOLEAN,
      },
      clientFeedback: {
        type: DataTypes.JSONB,
      },
      isConfidential: {
        type: DataTypes.BOOLEAN,
      },
      confidentialityLevel: {
        type: DataTypes.ENUM("low", "medium", "high"),
      },
      customFields: {
        type: DataTypes.JSONB,
      },
      isPinned: {
        type: DataTypes.BOOLEAN,
      },
      isStarred: {
        type: DataTypes.BOOLEAN,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
      },
      blockerReason: {
        type: DataTypes.STRING,
      },
      isScheduled: {
        type: DataTypes.BOOLEAN,
      },
      scheduleDetails: {
        type: DataTypes.JSONB,
      },
      isAutomated: {
        type: DataTypes.BOOLEAN,
      },
      automationDetails: {
        type: DataTypes.JSONB,
      },
      isIntegrated: {
        type: DataTypes.BOOLEAN,
      },
      integrationDetails: {
        type: DataTypes.JSONB,
      },
      estimatedCompletionDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "tasks",
      timestamps: true,
    }
  );

  return Task;
};

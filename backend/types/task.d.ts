export interface ITask {
  id?: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    assignedTo?: number; // User ID
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number; // User ID of the creator
    updatedBy?: number; // User ID of the last updater
    projectId?: number; // Optional, if tasks are associated with projects
    tags?: string[]; // Optional, for categorization or filtering
    comments?: {
        userId: number; // User ID of the commenter
        comment: string;
        createdAt: Date;
    }[]; // Optional, for task comments
    attachments?: {
        fileName: string;
        filePath: string; // Path to the file
        uploadedBy: number; // User ID of the uploader
        uploadedAt: Date;
    }[]; // Optional, for task attachments
    estimatedTime?: number; // Estimated time to complete the task in hours
    actualTime?: number; // Actual time spent on the task in hours
    progress?: number; // Percentage of task completion
    dependencies?: number[]; // Array of task IDs that this task depends on
    isRecurring?: boolean; // Optional, if the task is recurring
    recurrencePattern?: {
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'; // Recurrence frequency
        interval: number; // Interval for the recurrence (e.g., every 2 weeks)
        endDate?: Date; // Optional, end date for the recurrence
    }; // Optional, for recurring tasks
    isArchived?: boolean; // Optional, to mark the task as archived
    isDeleted?: boolean; // Optional, to mark the task as deleted
    customFields?: {
        fieldName: string; // Name of the custom field
        fieldValue: string | number | boolean; // Value of the custom field
    }[]; // Optional, for additional custom fields
    parentTaskId?: number; // Optional, for subtasks
    labels?: string[]; // Optional, for task labels
    estimatedCompletionDate?: Date; // Optional, for estimated completion date
    lastUpdatedBy?: number; // User ID of the last person who updated the task
    isPinned?: boolean; // Optional, to pin the task for quick access
    isStarred?: boolean; // Optional, to mark the task as important
    isBlocked?: boolean; // Optional, to indicate if the task is blocked
    blockerReason?: string; // Optional, reason for blocking the task
    isTimeTracked?: boolean; // Optional, to indicate if time tracking is enabled for the task
    timeLogs?: {
        userId: number; // User ID of the person logging time
        startTime: Date; // Start time of the logged period
        endTime: Date; // End time of the logged period
        duration: number; // Duration in hours
        description?: string; // Optional description of the time log
    }[]; // Optional, for time tracking logs
    isReviewed?: boolean; // Optional, to indicate if the task has been reviewed
    reviewComments?: {
        reviewerId: number; // User ID of the reviewer
        comment: string; // Review comment
        createdAt: Date; // Date of the review comment
    }[]; // Optional, for review comments
    isApproved?: boolean; // Optional, to indicate if the task is approved
    approvalComments?: {
        approverId: number; // User ID of the approver
        comment: string; // Approval comment
        createdAt: Date; // Date of the approval comment
    }[]; // Optional, for approval comments
    isVisibleToClient?: boolean; // Optional, to indicate if the task is visible to clients
    clientFeedback?: {
        clientId: number; // User ID of the client providing feedback
        feedback: string; // Client feedback
        createdAt: Date; // Date of the feedback
    }[]; // Optional, for client feedback
    isConfidential?: boolean; // Optional, to mark the task as confidential
    confidentialityLevel?: 'low' | 'medium' | 'high'; // Optional, for confidentiality level
    isAutomated?: boolean; // Optional, to indicate if the task is automated
    automationDetails?: {
        automationType: string; // Type of automation (e.g., webhook, script)
        triggerEvent: string; // Event that triggers the automation
        action: string; // Action performed by the automation
    }[]; // Optional, for automation details
    isIntegrated?: boolean; // Optional, to indicate if the task is integrated with other systems
    integrationDetails?: {
        integrationType: string; // Type of integration (e.g., API, webhook)
        externalSystem: string; // Name of the external system
        integrationId: string; // ID of the integration
    }[]; // Optional, for integration details
    
    isArchivedBy?: number; // User ID of the person who archived the task
    archivedAt?: Date; // Date when the task was archived
    isDeletedBy?: number; // User ID of the person who deleted the task
    deletedAt?: Date; // Date when the task was deleted
    isRestored?: boolean; // Optional, to indicate if the task has been restored from archive
    restoredAt?: Date; // Date when the task was restored
    restoredBy?: number; // User ID of the person who restored the task
    isScheduled?: boolean; // Optional, to indicate if the task is scheduled
    scheduleDetails?: {
        scheduleType: 'one-time' | 'recurring'; // Type of schedule
        startDate: Date; // Start date of the schedule
        endDate?: Date; // Optional, end date of the schedule
        recurrencePattern?: {
            frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'; // Recurrence frequency
            interval: number; // Interval for the recurrence (e.g., every 2 weeks)
        }; // Optional, for recurring schedules
    }; // Optional, for scheduling details
}

    
# Requirements Document

## Introduction

This feature will integrate M-Pesa STK Push functionality into the Fortune Farm investment platform, allowing users to make deposits directly to their accounts using their mobile phone numbers. When a user initiates a deposit, they will receive an STK Push notification on their phone to authorize the payment, making the deposit process seamless and secure.

## Requirements

### Requirement 1

**User Story:** As an investor, I want to deposit money into my Fortune Farm account using M-Pesa STK Push, so that I can quickly fund my investment portfolio without leaving the platform.

#### Acceptance Criteria

1. WHEN a user navigates to the deposit section THEN the system SHALL display a deposit form with phone number and amount fields
2. WHEN a user enters a valid Kenyan phone number (07XXXXXXXX or +2547XXXXXXXX format) THEN the system SHALL accept the input
3. WHEN a user enters an invalid phone number format THEN the system SHALL display a validation error message
4. WHEN a user enters a deposit amount below the minimum threshold (KES 10) THEN the system SHALL display an error message
5. WHEN a user enters a deposit amount above the maximum threshold (KES 150,000) THEN the system SHALL display an error message
6. WHEN a user submits a valid deposit request THEN the system SHALL initiate an M-Pesa STK Push to their phone

### Requirement 2

**User Story:** As an investor, I want to receive an STK Push notification on my phone when I initiate a deposit, so that I can authorize the payment securely using my M-Pesa PIN.

#### Acceptance Criteria

1. WHEN the system initiates an STK Push THEN the user SHALL receive a payment prompt on their mobile device within 30 seconds
2. WHEN the STK Push is sent successfully THEN the system SHALL display a "Check your phone for payment prompt" message
3. WHEN the STK Push fails to send THEN the system SHALL display an appropriate error message
4. WHEN the user approves the payment on their phone THEN the system SHALL receive a callback notification
5. WHEN the user cancels or ignores the payment prompt THEN the system SHALL receive a timeout/cancellation callback after 60 seconds

### Requirement 3

**User Story:** As an investor, I want to see real-time updates on my deposit status, so that I know when my payment has been processed and my account balance updated.

#### Acceptance Criteria

1. WHEN a deposit is initiated THEN the system SHALL create a transaction record with "PENDING" status
2. WHEN the M-Pesa callback confirms successful payment THEN the system SHALL update the transaction status to "COMPLETED"
3. WHEN the M-Pesa callback indicates payment failure THEN the system SHALL update the transaction status to "FAILED"
4. WHEN a transaction is completed successfully THEN the system SHALL update the user's account balance
5. WHEN a transaction status changes THEN the system SHALL display the updated status to the user in real-time
6. WHEN a successful deposit is completed THEN the system SHALL send a confirmation notification to the user

### Requirement 4

**User Story:** As an investor, I want to view my deposit transaction history, so that I can track all my M-Pesa deposits and their statuses.

#### Acceptance Criteria

1. WHEN a user navigates to transaction history THEN the system SHALL display all deposit transactions with timestamps
2. WHEN displaying transactions THEN the system SHALL show transaction ID, amount, phone number, status, and date
3. WHEN a user clicks on a transaction THEN the system SHALL display detailed transaction information
4. WHEN filtering transactions THEN the system SHALL allow filtering by date range and status
5. IF a transaction is pending for more than 5 minutes THEN the system SHALL mark it as "EXPIRED"

### Requirement 5

**User Story:** As a system administrator, I want M-Pesa integration to be secure and compliant, so that user financial data is protected and regulatory requirements are met.

#### Acceptance Criteria

1. WHEN handling M-Pesa API credentials THEN the system SHALL store them securely using environment variables
2. WHEN processing callbacks THEN the system SHALL validate the callback source and signature
3. WHEN storing transaction data THEN the system SHALL encrypt sensitive information
4. WHEN logging transactions THEN the system SHALL not log sensitive user data (PIN, full phone numbers)
5. WHEN API calls fail THEN the system SHALL implement proper retry mechanisms with exponential backoff
6. WHEN handling errors THEN the system SHALL log errors for monitoring without exposing sensitive data to users

### Requirement 6

**User Story:** As a developer, I want the M-Pesa integration to be maintainable and testable, so that the system is reliable and can be easily updated.

#### Acceptance Criteria

1. WHEN implementing M-Pesa functionality THEN the system SHALL use a service layer pattern for API interactions
2. WHEN creating the integration THEN the system SHALL include comprehensive error handling for all M-Pesa API responses
3. WHEN building the feature THEN the system SHALL include unit tests for all M-Pesa service functions
4. WHEN deploying THEN the system SHALL support both sandbox and production M-Pesa environments
5. WHEN configuring the system THEN the system SHALL allow easy switching between environments via configuration
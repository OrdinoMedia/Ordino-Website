# Ordino Test App - User Guide

## For App Owner: Creating Test Accounts

To create personalized login accounts for your friends, you have two options:

### Option 1: Let Friends Sign Up Themselves
1. Share the app URL with your friends
2. They can click "Signup" on the welcome page
3. They'll enter their:
   - Full Name
   - Email address
   - Password (minimum 6 characters)
4. After signup, they can immediately log in with their credentials

### Option 2: Create Accounts for Them
You can also create accounts on behalf of your friends using the signup endpoint directly. This is useful if you want to set up accounts before sharing the app.

**Important Notes:**
- Each email can only be used once
- Passwords must be at least 6 characters
- Emails are automatically confirmed (no verification email needed since this is a test environment)
- All user data is stored securely in Supabase

## For Testers: How to Use the App

### First Time Login
1. Open the app and wait for the welcome screen
2. Click "Login" or "Signup"
3. Enter your credentials:
   - **Email**: The email address provided to you
   - **Password**: Your password

### Key Features to Test

**Home Hub**
- View your monthly financial snapshot
- See savings progress
- Track spending against budget
- View recent receipts
- Get personalized budget tips

**Receipts Page**
- Upload receipts via Photo, Upload, or Email
- Filter receipts by All Time, This Week, or This Month
- Click any receipt to see full details
- Track your badge progress (upload more receipts to earn badges!)

**Insights Page**
- View spending breakdown by category
- See weekly/monthly/yearly analytics
- Monitor budget performance
- Get category-specific insights

**Transactions Page**
- View all financial transactions
- Filter by type (Income, Expenses, Savings, Investments)
- Search transactions
- Click any transaction for details

**Profile Page**
- View your account information
- See your badge level
- Access settings
- Log out

### Session Management
- Once logged in, you'll stay logged in until you explicitly log out
- If you close and reopen the app, you'll automatically be logged back in
- Use the Profile page → Log Out button to sign out

### Badge System
Upload receipts to progress through badge levels:
- **Budget Beginner**: 1-10 receipts
- **Smart Saver**: 11-50 receipts
- **Budget Builder**: 51-150 receipts
- **Finance Pro**: 151-400 receipts
- **Money Maestro**: 401+ receipts

### Notes for Testing
- This is a prototype/test environment
- Some features use mock data for demonstration
- Your real financial data should NOT be entered into this test app
- Focus on testing the UI/UX and providing feedback on features

## Troubleshooting

**Can't log in?**
- Double-check your email and password
- Passwords are case-sensitive
- Make sure you've completed signup first

**Forgot password?**
- Contact the app owner to reset your account

**App not loading?**
- Try refreshing the page
- Check your internet connection
- Clear browser cache if needed

## Feedback

Please share your feedback on:
- User experience and navigation
- Visual design and branding
- Feature usefulness
- Any bugs or issues encountered
- Suggestions for improvements

---

*Remember: This is a test environment. Do not use real financial data or personally identifiable information.*

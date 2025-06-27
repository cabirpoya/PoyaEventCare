// Complete checklist data for all 7 sections
const checklistData = {
    sections: [
        {
            id: 1,
            title: "Pre-Event Planning & Preparation",
            color: "indigo",
            items: [
                { id: 1, item: "Define Event Objective", description: "Clarify goal: celebration, meeting, launch, etc.", priority: "high" },
                { id: 2, item: "Confirm Budget", description: "Ensure all items are within approved budget", priority: "high" },
                { id: 3, item: "Create Guest List", description: "Compile and verify attendee information", priority: "high" },
                { id: 4, item: "Send Invitations", description: "Distribute invites 3-4 weeks in advance", priority: "medium" },
                { id: 5, item: "Book Venue", description: "Secure location with backup options", priority: "high" },
                { id: 6, item: "Hire Catering Service", description: "Select menu and confirm dietary requirements", priority: "high" },
                { id: 7, item: "Arrange Transportation", description: "Coordinate guest arrival/departure logistics", priority: "medium" },
                { id: 8, item: "Book Entertainment", description: "Secure musicians, speakers, or performers", priority: "medium" },
                { id: 9, item: "Order Flowers & Decorations", description: "Coordinate with florist and decoration team", priority: "medium" },
                { id: 10, item: "Confirm Photography/Videography", description: "Book professional documentation services", priority: "medium" },
                { id: 11, item: "Prepare Event Timeline", description: "Create detailed schedule for all activities", priority: "high" },
                { id: 12, item: "Obtain Permits/Licenses", description: "Secure all required legal documentation", priority: "high" },
                { id: 13, item: "Insurance Coverage", description: "Verify event insurance and liability coverage", priority: "high" },
                { id: 14, item: "Weather Contingency Plan", description: "Prepare backup plans for outdoor events", priority: "medium" },
                { id: 15, item: "Final RSVP Confirmation", description: "Confirm final headcount 1 week before", priority: "high" }
            ]
        },
        {
            id: 2,
            title: "Site Cleaning & Venue Setup",
            color: "blue",
            items: [
                { id: 16, item: "Deep Clean Entire Venue", description: "Floor, windows, restrooms, corners, ceiling", priority: "high" },
                { id: 17, item: "Sanitize All Surfaces", description: "Disinfect tables, chairs, door handles, railings", priority: "high" },
                { id: 18, item: "Clean Kitchen/Catering Area", description: "Ensure food prep areas meet health standards", priority: "high" },
                { id: 19, item: "Test All Lighting Systems", description: "Check ambient, accent, and emergency lighting", priority: "medium" },
                { id: 20, item: "Sound System Setup", description: "Install and test microphones, speakers, AV equipment", priority: "high" },
                { id: 21, item: "Climate Control Check", description: "Adjust temperature and ventilation systems", priority: "medium" },
                { id: 22, item: "Set Up Registration Area", description: "Prepare welcome desk with materials and signage", priority: "medium" },
                { id: 23, item: "Install Directional Signage", description: "Place clear wayfinding signs throughout venue", priority: "low" },
                { id: 24, item: "Arrange Parking Areas", description: "Designate and mark parking spaces", priority: "medium" },
                { id: 25, item: "Security System Check", description: "Test alarms, cameras, and access controls", priority: "medium" },
                { id: 26, item: "Emergency Exit Verification", description: "Ensure all exits are clear and properly marked", priority: "high" },
                { id: 27, item: "Waste Management Setup", description: "Position trash bins and recycling stations", priority: "low" },
                { id: 28, item: "Wi-Fi Network Testing", description: "Verify internet connectivity throughout venue", priority: "medium" },
                { id: 29, item: "Power Supply Check", description: "Test electrical outlets and backup generators", priority: "high" },
                { id: 30, item: "Final Venue Walkthrough", description: "Complete inspection with venue manager", priority: "high" }
            ]
        },
        {
            id: 3,
            title: "Table Setup & Decoration",
            color: "green",
            items: [
                { id: 31, item: "Arrange Tables & Seating", description: "Position tables according to floor plan", priority: "high" },
                { id: 32, item: "Set Table Linens", description: "Apply tablecloths, runners, and napkins", priority: "medium" },
                { id: 33, item: "Place Centerpieces", description: "Arrange floral or decorative centerpieces", priority: "medium" },
                { id: 34, item: "Set Fine China & Glassware", description: "Place plates, glasses, and utensils properly", priority: "high" },
                { id: 35, item: "Fold Napkins Elegantly", description: "Create sophisticated napkin presentations", priority: "low" },
                { id: 36, item: "Position Candles/Lighting", description: "Arrange ambient lighting elements safely", priority: "medium" },
                { id: 37, item: "Set Up Head Table", description: "Special arrangement for VIPs or speakers", priority: "high" },
                { id: 38, item: "Place Name Cards/Seating Chart", description: "Ensure proper guest placement", priority: "medium" },
                { id: 39, item: "Arrange Cocktail Tables", description: "Set up standing reception areas", priority: "medium" },
                { id: 40, item: "Install Table Numbers", description: "Clear identification for each table", priority: "low" },
                { id: 41, item: "Set Up Gift/Card Table", description: "Designated area for guest contributions", priority: "low" },
                { id: 42, item: "Arrange Lounge Areas", description: "Comfortable seating for informal conversations", priority: "medium" },
                { id: 43, item: "Position Decorative Elements", description: "Banners, backdrops, and themed decorations", priority: "medium" },
                { id: 44, item: "Check Table Stability", description: "Ensure all furniture is secure and level", priority: "high" },
                { id: 45, item: "Final Table Presentation", description: "Polish and perfect all table settings", priority: "medium" }
            ]
        },
        {
            id: 4,
            title: "Catering & Food Service",
            color: "yellow",
            items: [
                { id: 46, item: "Confirm Final Menu", description: "Verify all dishes and dietary accommodations", priority: "high" },
                { id: 47, item: "Set Up Kitchen Stations", description: "Organize prep, cooking, and plating areas", priority: "high" },
                { id: 48, item: "Arrange Buffet/Service Areas", description: "Position serving stations strategically", priority: "high" },
                { id: 49, item: "Prepare Appetizers", description: "Ready first course and cocktail hour food", priority: "high" },
                { id: 50, item: "Set Up Beverage Stations", description: "Arrange bars, coffee, and water stations", priority: "high" },
                { id: 51, item: "Coordinate Service Staff", description: "Brief waiters, bartenders, and kitchen staff", priority: "high" },
                { id: 52, item: "Prepare Special Dietary Meals", description: "Handle vegetarian, vegan, gluten-free options", priority: "medium" },
                { id: 53, item: "Set Up Cake/Dessert Station", description: "Prepare special occasion desserts", priority: "medium" },
                { id: 54, item: "Ice and Beverage Prep", description: "Ensure adequate ice and drink supplies", priority: "medium" },
                { id: 55, item: "Food Temperature Control", description: "Maintain proper hot and cold food temperatures", priority: "high" },
                { id: 56, item: "Serving Utensils & Equipment", description: "Prepare all necessary serving tools", priority: "medium" },
                { id: 57, item: "Backup Food Supplies", description: "Extra portions for unexpected guests", priority: "low" },
                { id: 58, item: "Food Safety Protocols", description: "Implement HACCP and hygiene standards", priority: "high" },
                { id: 59, item: "Service Timing Coordination", description: "Synchronize food service with event schedule", priority: "high" },
                { id: 60, item: "Final Food Quality Check", description: "Taste test and presentation approval", priority: "high" }
            ]
        },
        {
            id: 5,
            title: "Event Execution & Management",
            color: "purple",
            items: [
                { id: 61, item: "Guest Registration & Welcome", description: "Smooth check-in process and greeting", priority: "high" },
                { id: 62, item: "Coordinate Event Timeline", description: "Manage schedule and transitions", priority: "high" },
                { id: 63, item: "Manage Entertainment Program", description: "Oversee speakers, performances, activities", priority: "high" },
                { id: 64, item: "Supervise Food Service", description: "Ensure timely and quality meal service", priority: "high" },
                { id: 65, item: "Handle Guest Relations", description: "Address questions, concerns, and special needs", priority: "high" },
                { id: 66, item: "Coordinate Photography", description: "Direct photo opportunities and documentation", priority: "medium" },
                { id: 67, item: "Manage Audio/Visual", description: "Control sound, lighting, and presentation tech", priority: "high" },
                { id: 68, item: "Monitor Event Flow", description: "Ensure smooth transitions between activities", priority: "high" },
                { id: 69, item: "Handle Special Presentations", description: "Coordinate speeches, awards, ceremonies", priority: "medium" },
                { id: 70, item: "Manage Gift/Prize Distribution", description: "Organize giveaways and recognition items", priority: "low" },
                { id: 71, item: "Coordinate Transportation", description: "Manage guest arrival and departure", priority: "medium" },
                { id: 72, item: "Handle Media Relations", description: "Manage press, social media, and publicity", priority: "medium" },
                { id: 73, item: "Monitor Guest Satisfaction", description: "Gather feedback and address issues promptly", priority: "medium" },
                { id: 74, item: "Manage Emergency Situations", description: "Handle unexpected issues professionally", priority: "high" },
                { id: 75, item: "Coordinate Event Conclusion", description: "Manage closing activities and farewells", priority: "medium" }
            ]
        },
        {
            id: 6,
            title: "Post-Event Cleanup & Follow-up",
            color: "red",
            items: [
                { id: 76, item: "Guest Departure Coordination", description: "Ensure smooth and safe guest exit", priority: "high" },
                { id: 77, item: "Collect Decorations & Equipment", description: "Gather all rental and owned items", priority: "medium" },
                { id: 78, item: "Pack Leftover Food", description: "Properly store or distribute remaining food", priority: "medium" },
                { id: 79, item: "Clean All Service Areas", description: "Kitchen, bars, and preparation spaces", priority: "high" },
                { id: 80, item: "Remove Table Settings", description: "Clear and clean all dinnerware and linens", priority: "medium" },
                { id: 81, item: "Dismantle Decorations", description: "Carefully remove and store decorative elements", priority: "medium" },
                { id: 82, item: "Return Rental Equipment", description: "Coordinate pickup or return of rented items", priority: "high" },
                { id: 83, item: "Final Venue Cleaning", description: "Restore venue to original condition", priority: "high" },
                { id: 84, item: "Secure Valuable Items", description: "Collect gifts, equipment, and important materials", priority: "high" },
                { id: 85, item: "Document Event Success", description: "Collect photos, videos, and testimonials", priority: "low" },
                { id: 86, item: "Send Thank You Notes", description: "Express gratitude to guests, vendors, staff", priority: "medium" },
                { id: 87, item: "Process Final Payments", description: "Settle all vendor and service provider bills", priority: "high" },
                { id: 88, item: "Conduct Post-Event Review", description: "Analyze successes and areas for improvement", priority: "medium" },
                { id: 89, item: "Archive Event Materials", description: "Store contracts, photos, and documentation", priority: "low" },
                { id: 90, item: "Follow Up with Clients", description: "Gather feedback and discuss future events", priority: "medium" }
            ]
        },
        {
            id: 7,
            title: "Backup Plans & Emergency Preparedness",
            color: "gray",
            items: [
                { id: 91, item: "Weather Contingency Plan", description: "Indoor alternatives for outdoor events", priority: "high" },
                { id: 92, item: "Vendor Backup Options", description: "Alternative suppliers for critical services", priority: "high" },
                { id: 93, item: "Emergency Contact List", description: "Key personnel, vendors, and emergency services", priority: "high" },
                { id: 94, item: "First Aid Kit & Medical Plan", description: "Health safety supplies and emergency procedures", priority: "high" },
                { id: 95, item: "Power Backup Systems", description: "Generators and alternative power sources", priority: "medium" },
                { id: 96, item: "Communication Backup", description: "Alternative methods for staff coordination", priority: "medium" },
                { id: 97, item: "Transportation Alternatives", description: "Backup options for guest transportation", priority: "medium" },
                { id: 98, item: "Food Service Contingencies", description: "Alternative catering options and emergency supplies", priority: "medium" },
                { id: 99, item: "Security Protocols", description: "Emergency evacuation and safety procedures", priority: "high" },
                { id: 100, item: "Equipment Failure Plans", description: "Backup AV, lighting, and technical equipment", priority: "medium" },
                { id: 101, item: "Staff Shortage Solutions", description: "On-call personnel and role coverage plans", priority: "medium" },
                { id: 102, item: "Financial Contingencies", description: "Emergency budget for unexpected expenses", priority: "medium" },
                { id: 103, item: "Legal/Insurance Backup", description: "Emergency legal contacts and insurance claims", priority: "low" },
                { id: 104, item: "Guest Accommodation Issues", description: "Solutions for seating, dietary, accessibility needs", priority: "medium" },
                { id: 105, item: "Crisis Communication Plan", description: "Media and stakeholder communication protocols", priority: "medium" }
            ]
        }
    ]
};

// Sample events data
const eventsData = [
    { id: 1, name: "Annual Corporate Gala", date: "2024-12-15", venue: "Grand Ballroom", status: "Planning" },
    { id: 2, name: "Product Launch Event", date: "2024-11-20", venue: "Convention Center", status: "In Progress" },
    { id: 3, name: "Wedding Reception", date: "2024-10-28", venue: "Garden Pavilion", status: "Completed" },
    { id: 4, name: "Charity Fundraiser", date: "2024-11-05", venue: "Hotel Ballroom", status: "Planning" }
];

// Sample assignees data
const assigneesData = [
    { id: 1, name: "Sarah Johnson", email: "sarah@eventpro.com", role: "Event Manager" },
    { id: 2, name: "Michael Chen", email: "michael@eventpro.com", role: "Catering Coordinator" },
    { id: 3, name: "Emily Rodriguez", email: "emily@eventpro.com", role: "Venue Coordinator" },
    { id: 4, name: "David Thompson", email: "david@eventpro.com", role: "Technical Manager" },
    { id: 5, name: "Lisa Wang", email: "lisa@eventpro.com", role: "Guest Relations" },
    { id: 6, name: "James Wilson", email: "james@eventpro.com", role: "Security Coordinator" }
];

// Status options
const statusOptions = [
    "Not Started",
    "In Progress", 
    "Completed",
    "On Hold",
    "Cancelled"
];

// Priority levels
const priorityLevels = {
    high: { label: "High", color: "red" },
    medium: { label: "Medium", color: "yellow" },
    low: { label: "Low", color: "green" }
};
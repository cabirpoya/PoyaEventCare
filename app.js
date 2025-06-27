// Main application logic
class EventManagementApp {
    constructor() {
        this.events = [...eventsData];
        this.assignees = [...assigneesData];
        this.checklistItems = [];
        this.eventTasks = [];
        this.currentTaskId = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.loadChecklistItems();
        this.renderChecklistSections();
        this.populateDropdowns();
        this.attachEventListeners();
        this.updateProgress();
        this.loadFromLocalStorage();
    }

    loadChecklistItems() {
        checklistData.sections.forEach(section => {
            section.items.forEach(item => {
                this.checklistItems.push({
                    ...item,
                    sectionId: section.id,
                    sectionTitle: section.title,
                    completed: false
                });
            });
        });
    }

    renderChecklistSections() {
        const sectionsContainer = document.getElementById('checklist-sections');
        sectionsContainer.innerHTML = '';

        checklistData.sections.forEach(section => {
            const sectionElement = this.createSectionElement(section);
            sectionsContainer.appendChild(sectionElement);
        });
    }

    createSectionElement(section) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'bg-white rounded-xl shadow overflow-hidden section-expanded';
        sectionDiv.innerHTML = `
            <div class="section-header bg-${section.color}-700 text-white px-6 py-4 cursor-pointer" onclick="app.toggleSection(${section.id})">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-bold">${section.id}. ${section.title}</h2>
                    <div class="flex items-center gap-4">
                        <span class="section-progress text-sm opacity-90">0/0 completed</span>
                        <i class="fas fa-chevron-down section-toggle"></i>
                    </div>
                </div>
            </div>
            <div class="section-content">
                <div class="responsive-table overflow-x-auto">
                    <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${section.items.map(item => this.createItemRow(item, section.id)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        return sectionDiv;
    }

    createItemRow(item, sectionId) {
        const priorityClass = `priority-${item.priority}`;
        const priorityBadge = `
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${priorityLevels[item.priority].color}-100 text-${priorityLevels[item.priority].color}-800">
                ${priorityLevels[item.priority].label}
            </span>
        `;

        return `
            <tr class="checklist-item hover:shadow-md transition ${priorityClass}" data-item-id="${item.id}" data-section-id="${sectionId}">
                <td class="px-6 py-4 whitespace-nowrap">
                    ${priorityBadge}
                </td>
                <td class="px-6 py-4 font-medium">
                    ${item.item}
                </td>
                <td class="px-6 py-4">
                    <span contenteditable="true" class="item-description" data-item-id="${item.id}">
                        ${item.description}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span contenteditable="true" class="assignee" data-item-id="${item.id}">
                        -
                    </span>
                </td>
                <td class="px-6 py-4">
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 status-checkbox" data-item-id="${item.id}">
                        <span class="ml-2 text-sm text-gray-600">Complete</span>
                    </label>
                </td>
            </tr>
        `;
    }

    toggleSection(sectionId) {
        const sectionElement = document.querySelector(`[data-section-id="${sectionId}"]`).closest('.bg-white');
        const toggleIcon = sectionElement.querySelector('.section-toggle');
        
        if (sectionElement.classList.contains('section-expanded')) {
            sectionElement.classList.remove('section-expanded');
            sectionElement.classList.add('section-collapsed');
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-right');
        } else {
            sectionElement.classList.remove('section-collapsed');
            sectionElement.classList.add('section-expanded');
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-down');
        }
    }

    populateDropdowns() {
        this.populateEventsDropdown();
        this.populateAssigneesDropdown();
        this.populateStatusDropdown();
    }

    populateEventsDropdown() {
        const dropdown = document.getElementById('cboEvents');
        dropdown.innerHTML = '<option value="">Select Event</option>';
        
        this.events.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.name} - ${this.formatDate(event.date)}`;
            dropdown.appendChild(option);
        });
    }

    populateAssigneesDropdown() {
        const dropdown = document.getElementById('cboAssignees');
        dropdown.innerHTML = '<option value="">Select Assignee</option>';
        
        this.assignees.forEach(assignee => {
            const option = document.createElement('option');
            option.value = assignee.id;
            option.textContent = `${assignee.name} (${assignee.role})`;
            dropdown.appendChild(option);
        });
    }

    populateStatusDropdown() {
        const dropdown = document.getElementById('cboStatus');
        dropdown.innerHTML = '<option value="">Select Status</option>';
        
        statusOptions.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            dropdown.appendChild(option);
        });
    }

    attachEventListeners() {
        // Progress tracking
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('status-checkbox')) {
                this.updateItemStatus(e.target);
                this.updateProgress();
                this.saveToLocalStorage();
            }
        });

        // Editable content
        document.addEventListener('blur', (e) => {
            if (e.target.contentEditable === 'true') {
                this.saveEditableContent(e.target);
            }
        });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterItems(e.target.value);
        });

        // Status filter
        document.getElementById('status-filter').addEventListener('change', (e) => {
            this.filterByStatus(e.target.value);
        });

        // Export functionality
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportData();
        });

        // Task management
        document.getElementById('cboEvents').addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadEventTasks(e.target.value);
            }
        });

        document.getElementById('btnSave').addEventListener('click', () => {
            this.saveTask();
        });

        document.getElementById('btnNew').addEventListener('click', () => {
            this.clearTaskForm();
        });

        // Add new item
        document.getElementById('add-item-btn').addEventListener('click', () => {
            this.addNewItem();
        });
    }

    updateItemStatus(checkbox) {
        const itemId = parseInt(checkbox.dataset.itemId);
        const item = this.checklistItems.find(item => item.id === itemId);
        if (item) {
            item.completed = checkbox.checked;
        }
    }

    updateProgress() {
        const checkboxes = document.querySelectorAll('.status-checkbox');
        const total = checkboxes.length;
        const completed = document.querySelectorAll('.status-checkbox:checked').length;
        const percentage = Math.round((completed / total) * 100) || 0;
        
        // Update overall progress
        document.getElementById('progress-percentage').textContent = `${percentage}%`;
        document.getElementById('progress-bar').style.width = `${percentage}%`;
        document.getElementById('completed-count').textContent = `${completed} completed`;
        document.getElementById('total-count').textContent = `${total} total items`;

        // Update section progress
        checklistData.sections.forEach(section => {
            this.updateSectionProgress(section.id);
        });
    }

    updateSectionProgress(sectionId) {
        const sectionItems = document.querySelectorAll(`[data-section-id="${sectionId}"] .status-checkbox`);
        const sectionCompleted = document.querySelectorAll(`[data-section-id="${sectionId}"] .status-checkbox:checked`);
        const sectionProgressElement = document.querySelector(`[data-section-id="${sectionId}"]`).closest('.bg-white').querySelector('.section-progress');
        
        if (sectionProgressElement) {
            sectionProgressElement.textContent = `${sectionCompleted.length}/${sectionItems.length} completed`;
        }
    }

    saveEditableContent(element) {
        const itemId = parseInt(element.dataset.itemId);
        const item = this.checklistItems.find(item => item.id === itemId);
        
        if (item) {
            if (element.classList.contains('item-description')) {
                item.description = element.textContent.trim();
            } else if (element.classList.contains('assignee')) {
                item.assignee = element.textContent.trim();
            }
            this.saveToLocalStorage();
        }
    }

    filterItems(searchTerm) {
        const rows = document.querySelectorAll('.checklist-item');
        const term = searchTerm.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }

    filterByStatus(status) {
        const rows = document.querySelectorAll('.checklist-item');
        
        rows.forEach(row => {
            const checkbox = row.querySelector('.status-checkbox');
            if (status === 'all' || 
                (status === 'completed' && checkbox.checked) || 
                (status === 'pending' && !checkbox.checked)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            events: this.events,
            checklistItems: this.checklistItems,
            tasks: this.eventTasks
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `event-checklist-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully!', 'success');
    }

    loadEventTasks(eventId) {
        const tasksList = document.getElementById('lstTasks');
        tasksList.innerHTML = '';
        
        const eventTasks = this.eventTasks.filter(task => task.eventId == eventId);
        
        eventTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item grid grid-cols-6 gap-2 p-2 border-b hover:bg-gray-50 cursor-pointer';
            taskElement.innerHTML = `
                <div class="text-sm font-mono">${task.id}</div>
                <div class="text-sm">${this.getChecklistItemName(task.itemId)}</div>
                <div class="text-sm">${this.formatDate(task.dueDate)}</div>
                <div class="text-sm">
                    <span class="status-badge status-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
                </div>
                <div class="text-sm">${this.getAssigneeName(task.assigneeId)}</div>
                <div class="text-sm text-center">${task.completed ? '✅' : '⏳'}</div>
            `;
            taskElement.addEventListener('click', () => this.loadTaskDetails(task.id));
            tasksList.appendChild(taskElement);
        });
    }

    saveTask() {
        const taskId = document.getElementById('txtTaskID').value;
        const eventId = document.getElementById('cboEvents').value;
        const item = document.getElementById('txtItem').value;
        const assigneeId = document.getElementById('cboAssignees').value;
        const dueDate = document.getElementById('txtDueDate').value;
        const status = document.getElementById('cboStatus').value;
        const notes = document.getElementById('txtNotes').value;
        const completed = document.getElementById('chkComplete').checked;

        if (!eventId || !item || !assigneeId || !dueDate || !status) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (taskId) {
            // Update existing task
            const taskIndex = this.eventTasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                this.eventTasks[taskIndex] = {
                    ...this.eventTasks[taskIndex],
                    eventId: parseInt(eventId),
                    assigneeId: parseInt(assigneeId),
                    dueDate,
                    status,
                    notes,
                    completed
                };
                this.showNotification('Task updated successfully!', 'success');
            }
        } else {
            // Create new task
            const newTask = {
                id: 'T' + Date.now(),
                eventId: parseInt(eventId),
                itemId: this.findChecklistItemId(item),
                assigneeId: parseInt(assigneeId),
                dueDate,
                status,
                notes,
                completed,
                createdAt: new Date().toISOString()
            };
            this.eventTasks.push(newTask);
            this.showNotification('Task created successfully!', 'success');
        }

        this.loadEventTasks(eventId);
        this.saveToLocalStorage();
    }

    loadTaskDetails(taskId) {
        const task = this.eventTasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('txtTaskID').value = task.id;
            document.getElementById('cboEvents').value = task.eventId;
            document.getElementById('txtItem').value = this.getChecklistItemName(task.itemId);
            document.getElementById('cboAssignees').value = task.assigneeId;
            document.getElementById('txtDueDate').value = task.dueDate;
            document.getElementById('cboStatus').value = task.status;
            document.getElementById('txtNotes').value = task.notes || '';
            document.getElementById('chkComplete').checked = task.completed;
            this.currentTaskId = taskId;
        }
    }

    clearTaskForm() {
        document.getElementById('txtTaskID').value = '';
        document.getElementById('txtItem').value = '';
        document.getElementById('cboAssignees').value = '';
        document.getElementById('txtDueDate').value = '';
        document.getElementById('cboStatus').value = '';
        document.getElementById('txtNotes').value = '';
        document.getElementById('chkComplete').checked = false;
        this.currentTaskId = null;
    }

    addNewItem() {
        const section = document.getElementById('new-item-section').value;
        const name = document.getElementById('new-item-name').value.trim();
        const description = document.getElementById('new-item-desc').value.trim();
        
        if (!name) {
            this.showNotification('Please enter an item name', 'error');
            return;
        }

        const newItem = {
            id: Date.now(),
            item: name,
            description: description || 'Custom item',
            priority: 'medium',
            sectionId: parseInt(section),
            completed: false,
            custom: true
        };

        this.checklistItems.push(newItem);
        this.showNotification('Item added successfully!', 'success');
        
        // Clear form
        document.getElementById('new-item-name').value = '';
        document.getElementById('new-item-desc').value = '';
        
        // Re-render the specific section
        this.renderChecklistSections();
        this.updateProgress();
        this.saveToLocalStorage();
    }

    // Helper methods
    getChecklistItemName(itemId) {
        const item = this.checklistItems.find(item => item.id === itemId);
        return item ? item.item : 'Unknown Item';
    }

    getAssigneeName(assigneeId) {
        const assignee = this.assignees.find(a => a.id === assigneeId);
        return assignee ? assignee.name : 'Unassigned';
    }

    findChecklistItemId(itemName) {
        const item = this.checklistItems.find(item => item.item === itemName);
        return item ? item.id : null;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    saveToLocalStorage() {
        const data = {
            checklistItems: this.checklistItems,
            eventTasks: this.eventTasks,
            events: this.events,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('eventManagementData', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const savedData = localStorage.getItem('eventManagementData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.checklistItems) {
                    // Merge saved completion status with default items
                    data.checklistItems.forEach(savedItem => {
                        const item = this.checklistItems.find(item => item.id === savedItem.id);
                        if (item) {
                            item.completed = savedItem.completed;
                            item.assignee = savedItem.assignee;
                            if (savedItem.description !== item.description) {
                                item.description = savedItem.description;
                            }
                        }
                    });
                }
                if (data.eventTasks) {
                    this.eventTasks = data.eventTasks;
                }
                if (data.events) {
                    this.events = [...data.events];
                    this.populateEventsDropdown();
                }
                
                // Update UI with saved data
                setTimeout(() => {
                    this.checklistItems.forEach(item => {
                        const checkbox = document.querySelector(`[data-item-id="${item.id}"].status-checkbox`);
                        if (checkbox) {
                            checkbox.checked = item.completed;
                        }
                        
                        const assigneeElement = document.querySelector(`[data-item-id="${item.id}"].assignee`);
                        if (assigneeElement && item.assignee) {
                            assigneeElement.textContent = item.assignee;
                        }
                    });
                    this.updateProgress();
                }, 100);
                
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EventManagementApp();
});
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    schedule: {
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        startTime: String,
        endTime: String,
        room: String
    },
    materials: [{
        title: String,
        description: String,
        fileUrl: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    assignments: [{
        title: String,
        description: String,
        dueDate: Date,
        totalMarks: Number,
        fileUrl: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    maxEnrollment: {
        type: Number,
        default: 60
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);

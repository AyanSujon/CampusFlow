



"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserRound,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const student = {
    name: "Ayan Sujon",
    studentId: "STU-2026-CSE-0012",
    email: "ayan@example.com",
    phone: "+880 1XXX-XXXXXX",
    program: "B.Sc. in Computer Science & Engineering",
    department: "Computer Science & Engineering",
    faculty: "Faculty of Engineering",
    semester: "6th Semester",
    academicStatus: "ACTIVE",
    enrollmentDate: "January 15, 2024",
    dateOfBirth: "March 12, 2003",
    gender: "Male",
    bloodGroup: "B+",
    address: "Noakhali, Bangladesh",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View and manage your personal, academic and account information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing((current) => !current)}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Edit3 className="h-4 w-4" />
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Hero */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-28 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 sm:h-36" />

          <div className="px-5 pb-6 sm:px-7">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 text-3xl font-bold text-blue-600 shadow-md dark:border-slate-900 dark:bg-slate-800 dark:text-blue-400 sm:h-32 sm:w-32">
                    AS
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm dark:border-slate-900"
                      aria-label="Change profile photo"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                      {student.name}
                    </h2>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active Student
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {student.studentId}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {student.program}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Verified Account
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ProfileStat
            icon={<GraduationCap className="h-5 w-5" />}
            label="Program"
            value="B.Sc. CSE"
          />

          <ProfileStat
            icon={<BookOpen className="h-5 w-5" />}
            label="Current Semester"
            value={student.semester}
          />

          <ProfileStat
            icon={<Award className="h-5 w-5" />}
            label="Academic Status"
            value={student.academicStatus}
          />

          <ProfileStat
            icon={<CalendarDays className="h-5 w-5" />}
            label="Enrollment"
            value="Jan 2024"
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              icon={<User className="h-5 w-5" />}
              title="Personal Information"
              description="Your basic personal information"
            />

            <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
              <ProfileField
                label="Full Name"
                value={student.name}
                editable={isEditing}
              />

              <ProfileField
                label="Student ID"
                value={student.studentId}
                editable={false}
              />

              <ProfileField
                label="Date of Birth"
                value={student.dateOfBirth}
                editable={isEditing}
              />

              <ProfileField
                label="Gender"
                value={student.gender}
                editable={isEditing}
              />

              <ProfileField
                label="Blood Group"
                value={student.bloodGroup}
                editable={isEditing}
              />

              <ProfileField
                label="Address"
                value={student.address}
                editable={isEditing}
              />
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              icon={<Mail className="h-5 w-5" />}
              title="Contact Information"
              description="Your contact details"
            />

            <div className="space-y-5 p-5 sm:p-6">
              <ContactItem
                icon={<Mail className="h-4 w-4" />}
                label="Email Address"
                value={student.email}
              />

              <ContactItem
                icon={<Phone className="h-4 w-4" />}
                label="Phone Number"
                value={student.phone}
              />

              <ContactItem
                icon={<MapPin className="h-4 w-4" />}
                label="Address"
                value={student.address}
              />
            </div>
          </section>

          {/* Academic Information */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              icon={<GraduationCap className="h-5 w-5" />}
              title="Academic Information"
              description="Your university academic information"
            />

            <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
              <ProfileField
                label="Program"
                value={student.program}
                editable={false}
              />

              <ProfileField
                label="Department"
                value={student.department}
                editable={false}
              />

              <ProfileField
                label="Faculty"
                value={student.faculty}
                editable={false}
              />

              <ProfileField
                label="Current Semester"
                value={student.semester}
                editable={false}
              />

              <ProfileField
                label="Academic Status"
                value={student.academicStatus}
                editable={false}
              />

              <ProfileField
                label="Enrollment Date"
                value={student.enrollmentDate}
                editable={false}
              />
            </div>
          </section>

          {/* Account Status */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Account Status"
              description="Your account security status"
            />

            <div className="space-y-4 p-5 sm:p-6">
              <StatusRow
                label="Account"
                value="Active"
                active
              />

              <StatusRow
                label="Email"
                value="Verified"
                active
              />

              <StatusRow
                label="Student Profile"
                value="Verified"
                active
              />

              <StatusRow
                label="Academic Status"
                value="Active"
                active
              />
            </div>
          </section>
        </div>

        {/* Edit Footer */}
        {isEditing && (
          <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900/95">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                You are editing your profile
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Changes will be reviewed if required by the university.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  editable,
}: {
  label: string;
  value: string;
  editable: boolean;
}) {
  return (
    <div>
      <div className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>

      {editable ? (
        <input
          type="text"
          defaultValue={value}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />
      ) : (
        <div className="min-h-10 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">
          {value}
        </div>
      )}
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-700 dark:text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProfileStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function StatusRow({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800">
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {label}
      </span>

      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-emerald-500" : "bg-slate-400"
          }`}
        />
        {value}
      </span>
    </div>
  );
}


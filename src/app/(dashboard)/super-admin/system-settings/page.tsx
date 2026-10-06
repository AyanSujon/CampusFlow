
"use client";

import React, { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  CreditCard,
  Globe2,
  GraduationCap,
  Mail,
  Save,
  Settings,
  ShieldCheck,
  Smartphone,
  ToggleLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type SettingsTab =
  | "university"
  | "grading"
  | "notifications"
  | "payments"
  | "system";

const tabs: {
  id: SettingsTab;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "university",
    label: "University",
    description: "Basic university configuration",
    icon: Building2,
  },
  {
    id: "grading",
    label: "Grading",
    description: "Grades and academic rules",
    icon: GraduationCap,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Email and system alerts",
    icon: Bell,
  },
  {
    id: "payments",
    label: "Payments",
    description: "Payment gateway configuration",
    icon: CreditCard,
  },
  {
    id: "system",
    label: "System",
    description: "Global application preferences",
    icon: Settings,
  },
];

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("university");
  const [saved, setSaved] = useState(false);

  const [universitySettings, setUniversitySettings] = useState({
    universityName: "CampusFlow University",
    shortName: "CFU",
    email: "admin@campusflow.edu",
    phone: "+880 1XXX-XXXXXX",
    address: "Dhaka, Bangladesh",
    website: "https://campusflow.edu",
    timezone: "Asia/Dhaka",
    academicYear: "2026-2027",
  });

  const [gradingSettings, setGradingSettings] = useState({
    gradingScale: "4.00",
    passMark: "40",
    attendanceRequirement: "75",
    allowGradeEditing: true,
    publishResultsAutomatically: false,
    enableGpaCalculation: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    paymentNotifications: true,
    academicNotifications: true,
    systemNotifications: true,
    announcementNotifications: true,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    currency: "BDT",
    stripeEnabled: true,
    sslCommerzEnabled: true,
    bkashEnabled: false,
    automaticInvoice: true,
    paymentConfirmation: true,
    refundEnabled: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    emailVerification: true,
    twoFactorAuthentication: false,
    auditLogging: true,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
  });

  const handleSave = () => {
    setSaved(true);

    // Replace this with your API mutation later.
    console.log({
      universitySettings,
      gradingSettings,
      notificationSettings,
      paymentSettings,
      systemSettings,
    });

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const renderUniversitySettings = () => (
    <div className="space-y-6">
      <SettingsSection
        icon={Building2}
        title="University Information"
        description="Configure the basic information displayed throughout CampusFlow."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="University Name">
            <Input
              value={universitySettings.universityName}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  universityName: e.target.value,
                })
              }
              placeholder="University name"
            />
          </FormField>

          <FormField label="Short Name">
            <Input
              value={universitySettings.shortName}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  shortName: e.target.value,
                })
              }
              placeholder="CFU"
            />
          </FormField>

          <FormField label="University Email">
            <Input
              type="email"
              value={universitySettings.email}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  email: e.target.value,
                })
              }
              placeholder="admin@university.edu"
            />
          </FormField>

          <FormField label="Phone Number">
            <Input
              value={universitySettings.phone}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  phone: e.target.value,
                })
              }
              placeholder="+880..."
            />
          </FormField>

          <FormField label="Website">
            <Input
              value={universitySettings.website}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  website: e.target.value,
                })
              }
              placeholder="https://..."
            />
          </FormField>

          <FormField label="Timezone">
            <Input
              value={universitySettings.timezone}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  timezone: e.target.value,
                })
              }
              placeholder="Asia/Dhaka"
            />
          </FormField>

          <FormField label="Academic Year">
            <Input
              value={universitySettings.academicYear}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  academicYear: e.target.value,
                })
              }
              placeholder="2026-2027"
            />
          </FormField>

          <FormField label="Address">
            <Input
              value={universitySettings.address}
              onChange={(e) =>
                setUniversitySettings({
                  ...universitySettings,
                  address: e.target.value,
                })
              }
              placeholder="University address"
            />
          </FormField>
        </div>
      </SettingsSection>
    </div>
  );

  const renderGradingSettings = () => (
    <div className="space-y-6">
      <SettingsSection
        icon={GraduationCap}
        title="Grading Configuration"
        description="Configure academic grading, GPA and result publication rules."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <FormField label="Grading Scale">
            <Input
              value={gradingSettings.gradingScale}
              onChange={(e) =>
                setGradingSettings({
                  ...gradingSettings,
                  gradingScale: e.target.value,
                })
              }
              placeholder="4.00"
            />
          </FormField>

          <FormField label="Passing Mark (%)">
            <Input
              type="number"
              min="0"
              max="100"
              value={gradingSettings.passMark}
              onChange={(e) =>
                setGradingSettings({
                  ...gradingSettings,
                  passMark: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Attendance Requirement (%)">
            <Input
              type="number"
              min="0"
              max="100"
              value={gradingSettings.attendanceRequirement}
              onChange={(e) =>
                setGradingSettings({
                  ...gradingSettings,
                  attendanceRequirement: e.target.value,
                })
              }
            />
          </FormField>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={ShieldCheck}
        title="Academic Rules"
        description="Control how grades and results are handled."
      >
        <div className="divide-y rounded-xl border">
          <SettingSwitch
            label="Enable GPA Calculation"
            description="Automatically calculate GPA from published grades."
            checked={gradingSettings.enableGpaCalculation}
            onCheckedChange={(checked) =>
              setGradingSettings({
                ...gradingSettings,
                enableGpaCalculation: checked,
              })
            }
          />

          <SettingSwitch
            label="Allow Grade Editing"
            description="Allow authorized instructors and administrators to edit grades."
            checked={gradingSettings.allowGradeEditing}
            onCheckedChange={(checked) =>
              setGradingSettings({
                ...gradingSettings,
                allowGradeEditing: checked,
              })
            }
          />

          <SettingSwitch
            label="Automatically Publish Results"
            description="Publish examination results automatically after approval."
            checked={gradingSettings.publishResultsAutomatically}
            onCheckedChange={(checked) =>
              setGradingSettings({
                ...gradingSettings,
                publishResultsAutomatically: checked,
              })
            }
          />
        </div>
      </SettingsSection>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <SettingsSection
        icon={Bell}
        title="Notification Channels"
        description="Choose which communication channels are available to the system."
      >
        <div className="divide-y rounded-xl border">
          <SettingSwitch
            icon={Mail}
            label="Email Notifications"
            description="Send important system events through email."
            checked={notificationSettings.emailNotifications}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                emailNotifications: checked,
              })
            }
          />

          <SettingSwitch
            icon={Smartphone}
            label="SMS Notifications"
            description="Send notifications through SMS."
            checked={notificationSettings.smsNotifications}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                smsNotifications: checked,
              })
            }
          />

          <SettingSwitch
            icon={Bell}
            label="Push Notifications"
            description="Send browser or application push notifications."
            checked={notificationSettings.pushNotifications}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                pushNotifications: checked,
              })
            }
          />
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Bell}
        title="Notification Types"
        description="Control which events generate notifications."
      >
        <div className="divide-y rounded-xl border">
          <SettingSwitch
            label="Payment Notifications"
            description="Notify students about invoices and payment activity."
            checked={notificationSettings.paymentNotifications}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                paymentNotifications: checked,
              })
            }
          />

          <SettingSwitch
            label="Academic Notifications"
            description="Notify users about grades, exams and academic events."
            checked={notificationSettings.academicNotifications}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                academicNotifications: checked,
              })
            }
          />

          <SettingSwitch
            label="System Notifications"
            description="Send important security and system notifications."
            checked={notificationSettings.systemNotifications}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                systemNotifications: checked,
              })
            }
          />

          <SettingSwitch
            label="Announcement Notifications"
            description="Notify users when new university announcements are published."
            checked={notificationSettings.announcementNotifications}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                announcementNotifications: checked,
              })
            }
          />
        </div>
      </SettingsSection>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <SettingsSection
        icon={CreditCard}
        title="Payment Configuration"
        description="Configure the payment methods available to students."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="Default Currency">
            <Input
              value={paymentSettings.currency}
              onChange={(e) =>
                setPaymentSettings({
                  ...paymentSettings,
                  currency: e.target.value.toUpperCase(),
                })
              }
              placeholder="BDT"
            />
          </FormField>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={CreditCard}
        title="Payment Gateways"
        description="Enable or disable supported payment providers."
      >
        <div className="divide-y rounded-xl border">
          <SettingSwitch
            label="Stripe"
            description="Accept international card payments through Stripe."
            checked={paymentSettings.stripeEnabled}
            onCheckedChange={(checked) =>
              setPaymentSettings({
                ...paymentSettings,
                stripeEnabled: checked,
              })
            }
          />

          <SettingSwitch
            label="SSLCommerz"
            description="Accept local Bangladeshi payment methods."
            checked={paymentSettings.sslCommerzEnabled}
            onCheckedChange={(checked) =>
              setPaymentSettings({
                ...paymentSettings,
                sslCommerzEnabled: checked,
              })
            }
          />

          <SettingSwitch
            label="bKash"
            description="Allow students to pay using bKash."
            checked={paymentSettings.bkashEnabled}
            onCheckedChange={(checked) =>
              setPaymentSettings({
                ...paymentSettings,
                bkashEnabled: checked,
              })
            }
          />
        </div>
      </SettingsSection>

      <SettingsSection
        icon={CreditCard}
        title="Payment Rules"
        description="Configure automated payment behavior."
      >
        <div className="divide-y rounded-xl border">
          <SettingSwitch
            label="Automatic Invoice Creation"
            description="Automatically generate invoices for student financial obligations."
            checked={paymentSettings.automaticInvoice}
            onCheckedChange={(checked) =>
              setPaymentSettings({
                ...paymentSettings,
                automaticInvoice: checked,
              })
            }
          />

          <SettingSwitch
            label="Payment Confirmation"
            description="Send confirmation after a successful payment."
            checked={paymentSettings.paymentConfirmation}
            onCheckedChange={(checked) =>
              setPaymentSettings({
                ...paymentSettings,
                paymentConfirmation: checked,
              })
            }
          />

          <SettingSwitch
            label="Enable Refunds"
            description="Allow authorized administrators to process refunds."
            checked={paymentSettings.refundEnabled}
            onCheckedChange={(checked) =>
              setPaymentSettings({
                ...paymentSettings,
                refundEnabled: checked,
              })
            }
          />
        </div>
      </SettingsSection>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <SettingsSection
        icon={Settings}
        title="System Preferences"
        description="Control global behavior across the CampusFlow application."
      >
        <div className="divide-y rounded-xl border">
          <SettingSwitch
            label="Maintenance Mode"
            description="Temporarily restrict normal application access."
            checked={systemSettings.maintenanceMode}
            onCheckedChange={(checked) =>
              setSystemSettings({
                ...systemSettings,
                maintenanceMode: checked,
              })
            }
          />

          <SettingSwitch
            label="Allow New Registration"
            description="Allow new users and students to register."
            checked={systemSettings.allowRegistration}
            onCheckedChange={(checked) =>
              setSystemSettings({
                ...systemSettings,
                allowRegistration: checked,
              })
            }
          />

          <SettingSwitch
            label="Email Verification"
            description="Require users to verify their email address."
            checked={systemSettings.emailVerification}
            onCheckedChange={(checked) =>
              setSystemSettings({
                ...systemSettings,
                emailVerification: checked,
              })
            }
          />

          <SettingSwitch
            label="Two-Factor Authentication"
            description="Enable 2FA as an additional security layer."
            checked={systemSettings.twoFactorAuthentication}
            onCheckedChange={(checked) =>
              setSystemSettings({
                ...systemSettings,
                twoFactorAuthentication: checked,
              })
            }
          />

          <SettingSwitch
            label="Audit Logging"
            description="Record administrative and security-sensitive activities."
            checked={systemSettings.auditLogging}
            onCheckedChange={(checked) =>
              setSystemSettings({
                ...systemSettings,
                auditLogging: checked,
              })
            }
          />
        </div>
      </SettingsSection>

      <SettingsSection
        icon={ShieldCheck}
        title="Security Configuration"
        description="Configure authentication and session behavior."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="Session Timeout (minutes)">
            <Input
              type="number"
              min="5"
              value={systemSettings.sessionTimeout}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  sessionTimeout: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Maximum Login Attempts">
            <Input
              type="number"
              min="1"
              value={systemSettings.maxLoginAttempts}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  maxLoginAttempts: e.target.value,
                })
              }
            />
          </FormField>
        </div>
      </SettingsSection>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "university":
        return renderUniversitySettings();
      case "grading":
        return renderGradingSettings();
      case "notifications":
        return renderNotificationSettings();
      case "payments":
        return renderPaymentSettings();
      case "system":
        return renderSystemSettings();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Settings className="size-5" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                System Settings
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Manage university configuration, academic rules,
                notifications, payments and global application behavior.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleSave}
            className="w-full gap-2 sm:w-auto"
          >
            {saved ? (
              <>
                <Check className="size-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {/* Main Settings Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit rounded-xl border bg-card p-2 lg:sticky lg:top-6">
            <div className="mb-2 hidden px-3 py-2 lg:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Configuration
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-1 lg:grid-cols-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "flex min-w-0 items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "hover:bg-muted",
                    ].join(" ")}
                  >
                    <Icon className="size-4 shrink-0" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {tab.label}
                      </p>

                      <p
                        className={[
                          "mt-0.5 hidden truncate text-xs xl:block",
                          isActive
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {tab.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            <div className="mb-5 flex items-center gap-2 lg:hidden">
              {(() => {
                const active = tabs.find((tab) => tab.id === activeTab);
                if (!active) return null;

                const Icon = active.icon;

                return (
                  <>
                    <Icon className="size-4 text-primary" />
                    <div>
                      <h2 className="font-semibold">{active.label}</h2>
                      <p className="text-xs text-muted-foreground">
                        {active.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-start gap-3 border-b p-4 sm:p-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function SettingSwitch({
  icon: Icon,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  icon?: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <div className="mt-0.5 hidden size-8 shrink-0 items-center justify-center rounded-lg bg-muted sm:flex">
            <Icon className="size-4 text-muted-foreground" />
          </div>
        )}

        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="shrink-0"
      />
    </div>
  );
}


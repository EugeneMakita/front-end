import SettingsSectionShell from "@/app/settings/_components/settings-section-shell"

export default function MoreSettingsPage() {
  return (
    <SettingsSectionShell
      title="More"
      description="Additional account preferences and controls."
      primaryLabel="Timezone"
      secondaryLabel="Language"
    />
  )
}

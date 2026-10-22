using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Forms;

[assembly: AssemblyTitle("Polaris Agent")]
[assembly: AssemblyProduct("Polaris Agent")]
[assembly: AssemblyDescription("Local agent desktop workspace")]
[assembly: AssemblyVersion("0.1.0.0")]

internal static class PolarisLauncher
{
    [STAThread]
    private static void Main()
    {
        string root = AppDomain.CurrentDomain.BaseDirectory;
        try
        {
            string script = Path.Combine(root, "scripts", "start.ps1");
            if (!File.Exists(script)) throw new FileNotFoundException("Cannot find scripts/start.ps1.");
            Process.Start(new ProcessStartInfo
            {
                FileName = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.System), "WindowsPowerShell", "v1.0", "powershell.exe"),
                Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File \"" + script + "\"",
                WorkingDirectory = root,
                UseShellExecute = false,
                CreateNoWindow = true,
                WindowStyle = ProcessWindowStyle.Hidden
            });
        }
        catch (Exception error)
        {
            MessageBox.Show(error.Message, "Polaris Agent", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}

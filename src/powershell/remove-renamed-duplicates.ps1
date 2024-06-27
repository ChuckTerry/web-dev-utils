Add-Type -AssemblyName System.Windows.Forms;
Add-Type -AssemblyName System.Drawing;

$wideControlSize = New-Object System.Drawing.Size(1150, 20);
$buttonSize = New-Object System.Drawing.Size(75, 23);
$outputNotice = "Error Running Script.";
$cwd = $originalDirectory = (Get-Item .).FullName + "\";

$foldername = New-Object System.Windows.Forms.FolderBrowserDialog;
$foldername.Description = "Select a folder";
$foldername.rootfolder = "MyComputer";
$foldername.SelectedPath = $cwd;
if($foldername.ShowDialog() -eq "OK") { Set-Location -Path $foldername.SelectedPath; }

$cwd = (Get-Item .).FullName + "\";
$files = dir | ?{$_.name -match "^.*?\([0-9]{1,2}\)\.[A-Za-z0-9]*?$"};
$countedItems =  $files.Count;
if ($countedItems -gt 20) { $countedItems = 20; }
$listBoxHeight = $countedItems * 20;
$controlsY = $listBoxHeight + 70;

$panel = New-Object System.Windows.Forms.Panel;
$panel.Size = New-Object System.Drawing.Size(300, 100);
$panel.Dock = "Bottom";

$resultsButton = New-Object System.Windows.Forms.Button;
$resultsButton.Size = New-Object System.Drawing.Size(70, 25);
$resultsButton.Location = New-Object System.Drawing.Point((($panel.Width - $resultsButton.Width) / 2), ((($panel.Height - $resultsButton.Height) / 2)));
$resultsButton.Anchor = "None";
$resultsButton.Text = "Confrim";
$resultsButton.DialogResult = [System.Windows.Forms.DialogResult]::OK;

$resultsLabel = New-Object System.Windows.Forms.Label;
$resultsLabel.Size = New-Object System.Drawing.Size(150, 23);
$resultsLabel.Location = New-Object System.Drawing.Point((($panel.Width - $resultsButton.Width) / 2));
$resultsLabel.TextAlign = "MiddleCenter"
  
$resultsForm = New-Object System.Windows.Forms.Form;
$resultsForm.Text = 'Complete';
$resultsForm.Size = New-Object System.Drawing.Size(400, 160);
$resultsForm.StartPosition = 'CenterScreen';
$resultsForm.Topmost = $true;

$panel.Controls.Add($resultsLabel);
$panel.Controls.Add($resultsButton);
$resultsForm.Controls.Add($panel);

if ($countedItems -lt 2) {
  $resultsLabel.Text = $outputNotice = "No Duplicates Detected.";
  $resultsForm.ShowDialog();
} else {
  $directoryLabel = New-Object System.Windows.Forms.Label;
  $directoryLabel.Location = New-Object System.Drawing.Point(15, 20);
  $directoryLabel.Size = $wideControlSize;
  $directoryLabel.Text = "Directory: $($cwd)";
  
  $instructionLabel = New-Object System.Windows.Forms.Label;
  $instructionLabel.Location = New-Object System.Drawing.Point(15, 40);
  $instructionLabel.Size = $wideControlSize;
  $instructionLabel.Text = "Select Duplicates to Delete:";
  
  $OKButton = New-Object System.Windows.Forms.Button;
  $OKButton.Location = New-Object System.Drawing.Point(400, $controlsY);
  $OKButton.Size = $buttonSize;
  $OKButton.Text = 'Confirm';
  $OKButton.DialogResult = [System.Windows.Forms.DialogResult]::OK;
  
  $CancelButton = New-Object System.Windows.Forms.Button;
  $CancelButton.Location = New-Object System.Drawing.Point(490, $controlsY);
  $CancelButton.Size = $buttonSize;
  $CancelButton.Text = 'Cancel';
  $CancelButton.DialogResult = [System.Windows.Forms.DialogResult]::Cancel;
  
  $listBox = New-Object System.Windows.Forms.Listbox;
  $listBox.Location = New-Object System.Drawing.Point(15, 60);
  $listBox.Size = $wideControlSize;
  $listBox.SelectionMode = 'MultiSimple';
  $listBox.Height = $listBoxHeight;
  foreach ($file in $files) { [void] $listBox.Items.Add($file.Name); }
  
  $selectDuplicatesForm = New-Object System.Windows.Forms.Form;
  $selectDuplicatesForm.Text = 'Auto-Renamed Duplicate Detector';
  $selectDuplicatesForm.Size = New-Object System.Drawing.Size(1200, 660);
  $selectDuplicatesForm.StartPosition = 'CenterScreen';
  $selectDuplicatesForm.Topmost = $true;
  $selectDuplicatesForm.Controls.Add($directoryLabel);
  $selectDuplicatesForm.Controls.Add($instructionLabel);
  $selectDuplicatesForm.Controls.Add($listBox);
  $selectDuplicatesForm.AcceptButton = $OKButton;
  $selectDuplicatesForm.Controls.Add($OKButton);
  $selectDuplicatesForm.CancelButton = $CancelButton;
  $selectDuplicatesForm.Controls.Add($CancelButton);
  
  $result = $selectDuplicatesForm.ShowDialog();
  
  if ($result -eq [System.Windows.Forms.DialogResult]::OK) {
    $selected = $listBox.SelectedItems;
    $fileCount = $selected.Count;
    $fileDeletedCount = 0;
    if ($fileCount -gt 0) {
      foreach ($fileName in $selected) {
        $filePath = $cwd + $fileName;
        try {
          Remove-Item -Path $filePath;
  	      $fileDeletedCount++;
        } catch {
          Write-Output "Error Deleting File $($filePath):";
          Write-Output $_;
        }
      }
      $outputNotice = $resultsLabel.Text = "Succesfully Deleted $($fileCount) of $($fileDeletedCount) Files!";
	  $resultsForm.ShowDialog();
    } else {
      $outputNotice = $resultsLabel.Text = "No Files Selected for Deletion.";
	  $resultsForm.ShowDialog();
    }
  } else {
    $outputNotice = $resultsLabel.Text = "Operation Canceled.";
	$resultsForm.ShowDialog();
  }
}
Set-Location -Path $originalDirectory;

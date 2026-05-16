Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

function Color([int]$r, [int]$g, [int]$b, [int]$a = 255) {
  [System.Drawing.Color]::FromArgb($a, $r, $g, $b)
}

function Font([string]$family, [float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
  New-Object System.Drawing.Font($family, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function New-RoundPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $path
}

function Fill-Round([System.Drawing.Graphics]$g, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r, [System.Drawing.Color]$color) {
  $path = New-RoundPath $x $y $w $h $r
  $brush = New-Object System.Drawing.SolidBrush($color)
  $g.FillPath($brush, $path)
  $brush.Dispose()
  $path.Dispose()
}

function Stroke-Round([System.Drawing.Graphics]$g, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r, [System.Drawing.Color]$color, [float]$width = 2) {
  $path = New-RoundPath $x $y $w $h $r
  $pen = New-Object System.Drawing.Pen($color, $width)
  $g.DrawPath($pen, $path)
  $pen.Dispose()
  $path.Dispose()
}

function Draw-Text(
  [System.Drawing.Graphics]$g,
  [string]$text,
  [float]$x,
  [float]$y,
  [float]$w,
  [float]$h,
  [System.Drawing.Font]$font,
  [System.Drawing.Color]$color,
  [string]$align = 'Near'
) {
  $brush = New-Object System.Drawing.SolidBrush($color)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::$align
  $format.LineAlignment = [System.Drawing.StringAlignment]::Near
  $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
  $rect = New-Object System.Drawing.RectangleF($x, $y, $w, $h)
  $g.DrawString($text, $font, $brush, $rect, $format)
  $format.Dispose()
  $brush.Dispose()
}

function Draw-Line([System.Drawing.Graphics]$g, [float]$x1, [float]$y1, [float]$x2, [float]$y2, [System.Drawing.Color]$color, [float]$width = 3) {
  $pen = New-Object System.Drawing.Pen($color, $width)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine($pen, $x1, $y1, $x2, $y2)
  $pen.Dispose()
}

function Draw-Chip([System.Drawing.Graphics]$g, [string]$text, [float]$x, [float]$y, [float]$w) {
  Fill-Round $g $x $y $w 42 21 (Color 255 255 255 18)
  Draw-Text $g $text ($x + 18) ($y + 11) ($w - 36) 24 (Font 'Segoe UI' 16 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225 205)
}

function Draw-Window([System.Drawing.Graphics]$g, [float]$x, [float]$y, [float]$w, [float]$h) {
  Fill-Round $g $x $y $w $h 28 (Color 24 24 24 230)
  Stroke-Round $g $x $y $w $h 28 (Color 164 140 129 76) 2
  Fill-Round $g ($x + 24) ($y + 24) ($w - 48) 62 18 (Color 255 255 255 12)
  foreach ($i in 0..2) {
    $brush = New-Object System.Drawing.SolidBrush((Color 255 182 147 (120 - $i * 24)))
    $g.FillEllipse($brush, ($x + 48 + $i * 34), ($y + 43), 18, 18)
    $brush.Dispose()
  }
}

function Draw-Base([System.Drawing.Graphics]$g, [string]$title, [string]$subtitle, [string]$ghost, [System.Drawing.Color]$accent) {
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(0, 0, 1600, 1600)),
    (Color 14 14 14),
    (Color 32 28 26),
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
  )
  $g.FillRectangle($bg, 0, 0, 1600, 1600)
  $bg.Dispose()

  $halo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, $accent.R, $accent.G, $accent.B))
  $g.FillEllipse($halo, 920, -240, 720, 720)
  $g.FillEllipse($halo, -220, 960, 560, 560)
  $halo.Dispose()

  $gridPen = New-Object System.Drawing.Pen((Color 255 255 255 10), 1)
  for ($i = 100; $i -lt 1600; $i += 100) {
    $g.DrawLine($gridPen, $i, 0, $i, 1600)
    $g.DrawLine($gridPen, 0, $i, 1600, $i)
  }
  $gridPen.Dispose()

  Draw-Text $g $ghost 40 1010 1520 330 (Font 'Georgia' 210 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225 14) 'Center'
  Draw-Text $g $title 96 90 900 80 (Font 'Georgia' 58 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  Draw-Text $g $subtitle 100 164 860 46 (Font 'Segoe UI' 24 ([System.Drawing.FontStyle]::Regular)) (Color 220 193 181 220)
  Draw-Line $g 100 238 280 238 $accent 6
}

function Save-Jpeg([System.Drawing.Bitmap]$bmp, [string]$path) {
  $dir = Split-Path -Parent $path
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)
  $bmp.Save($path, $codec, $params)
  $params.Dispose()
}

function New-Cover([string]$slug, [scriptblock]$draw) {
  $bmp = New-Object System.Drawing.Bitmap(1600, 1600)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  & $draw $g
  Save-Jpeg $bmp (Join-Path $PSScriptRoot "..\public\projects\$slug\cover.jpg")
  $g.Dispose()
  $bmp.Dispose()
}

New-Cover 'offerpilot-v2' {
  param($g)
  $accent = Color 255 182 147
  Draw-Base $g 'OfferPilotV2' 'Local-first job-search command center' 'OPV2' $accent
  Draw-Window $g 120 330 1360 880
  Fill-Round $g 172 440 320 650 22 (Color 17 17 17 220)
  Draw-Text $g 'Pipeline' 210 470 250 42 (Font 'Segoe UI' 26 ([System.Drawing.FontStyle]::Bold)) (Color 255 182 147)
  $stages = @('Scout', 'Tailor', 'Research', 'Apply')
  for ($i = 0; $i -lt $stages.Count; $i++) {
    $y = 548 + $i * 118
    Fill-Round $g 210 $y 240 72 18 (Color 255 255 255 (22 + $i * 4))
    Draw-Text $g $stages[$i] 236 ($y + 20) 180 32 (Font 'Segoe UI' 22 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  }
  Fill-Round $g 560 450 520 420 24 (Color 255 255 255 14)
  Draw-Text $g 'Agent run' 600 490 380 44 (Font 'Segoe UI' 28 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  $nodes = @(@(650, 610, 'Scout'), @(820, 735, 'Tailor'), @(1000, 610, 'Researcher'))
  Draw-Line $g 714 644 816 720 $accent 4
  Draw-Line $g 894 720 980 646 $accent 4
  foreach ($node in $nodes) {
    $brush = New-Object System.Drawing.SolidBrush((Color 179 84 30 180))
    $g.FillEllipse($brush, $node[0], $node[1], 112, 112)
    $brush.Dispose()
    Draw-Text $g $node[2] ($node[0] - 24) ($node[1] + 38) 160 36 (Font 'Segoe UI' 18 ([System.Drawing.FontStyle]::Bold)) (Color 255 241 237) 'Center'
  }
  Fill-Round $g 1130 450 260 510 20 (Color 229 226 225 210)
  Draw-Text $g 'Resume' 1165 490 200 44 (Font 'Georgia' 28 ([System.Drawing.FontStyle]::Bold)) (Color 49 48 48)
  for ($i = 0; $i -lt 8; $i++) {
    Draw-Line $g 1166 (560 + $i * 44) 1342 (560 + $i * 44) (Color 49 48 48 130) 6
  }
  Draw-Chip $g 'TAURI' 600 955 120
  Draw-Chip $g 'RUST' 742 955 106
  Draw-Chip $g 'REACT' 870 955 122
}

New-Cover 'support-triage' {
  param($g)
  $accent = Color 255 182 147
  Draw-Base $g 'Support Triage' 'Ticket classification, KB retrieval, grounded drafts' 'TRIAGE' $accent
  Draw-Window $g 120 318 1360 910
  Fill-Round $g 178 430 390 650 22 (Color 255 255 255 12)
  Draw-Text $g 'Inbound queue' 212 468 280 42 (Font 'Segoe UI' 26 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  $tickets = @('Login loop', 'Billing export', 'API timeout', 'SSO mapping')
  for ($i = 0; $i -lt $tickets.Count; $i++) {
    $y = 550 + $i * 115
    Fill-Round $g 216 $y 306 72 16 (Color 255 255 255 (20 + $i * 6))
    Draw-Text $g $tickets[$i] 240 ($y + 21) 200 32 (Font 'Segoe UI' 20 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
    Fill-Round $g 442 ($y + 22) 52 28 14 (Color 179 84 30 170)
  }
  Fill-Round $g 630 430 360 650 22 (Color 179 84 30 38)
  Draw-Text $g 'Classifier' 668 468 240 42 (Font 'Segoe UI' 26 ([System.Drawing.FontStyle]::Bold)) (Color 255 182 147)
  foreach ($item in @(@(694, 570, 'Bug'), @(812, 668, 'How-to'), @(704, 780, 'Billing'), @(826, 888, 'Escalate'))) {
    Fill-Round $g $item[0] $item[1] 164 56 28 (Color 255 255 255 22)
    Draw-Text $g $item[2] ($item[0] + 24) ($item[1] + 16) 116 26 (Font 'Segoe UI' 18 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  }
  Fill-Round $g 1050 430 340 650 22 (Color 255 255 255 12)
  Draw-Text $g 'Draft reply' 1088 468 230 42 (Font 'Segoe UI' 26 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  for ($i = 0; $i -lt 7; $i++) {
    Draw-Line $g 1092 (555 + $i * 48) (1334 - (($i % 3) * 34)) (555 + $i * 48) (Color 229 226 225 120) 7
  }
  Draw-Chip $g 'KB #14' 1090 940 126
  Draw-Chip $g 'CITED' 1236 940 126
  Draw-Line $g 568 760 630 760 $accent 4
  Draw-Line $g 990 760 1050 760 $accent 4
}

New-Cover 'csm-account-pulse' {
  param($g)
  $accent = Color 255 182 147
  Draw-Base $g 'CSM Account Pulse' 'Monday account-health dashboard' 'PULSE' $accent
  Draw-Window $g 120 318 1360 910
  Fill-Round $g 180 430 330 240 22 (Color 179 84 30 40)
  Draw-Text $g 'Health score' 220 468 220 36 (Font 'Segoe UI' 24 ([System.Drawing.FontStyle]::Bold)) (Color 255 182 147)
  $penBack = New-Object System.Drawing.Pen((Color 255 255 255 26), 28)
  $penBack.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $penBack.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($penBack, 250, 528, 190, 190, 180, 180)
  $penBack.Dispose()
  $penScore = New-Object System.Drawing.Pen($accent, 28)
  $penScore.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $penScore.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($penScore, 250, 528, 190, 190, 180, 132)
  $penScore.Dispose()
  Draw-Text $g '74' 295 590 100 72 (Font 'Georgia' 62 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225) 'Center'
  Fill-Round $g 560 430 820 240 22 (Color 255 255 255 12)
  Draw-Text $g 'Renewal path' 604 468 250 40 (Font 'Segoe UI' 24 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  $points = @(640, 810, 975, 1150, 1290)
  for ($i = 0; $i -lt $points.Count - 1; $i++) {
    Draw-Line $g $points[$i] 590 $points[$i + 1] 590 (Color 255 182 147 150) 5
  }
  foreach ($x in $points) {
    $brush = New-Object System.Drawing.SolidBrush((Color 179 84 30 210))
    $g.FillEllipse($brush, $x - 20, 570, 40, 40)
    $brush.Dispose()
  }
  Fill-Round $g 180 730 1200 350 22 (Color 255 255 255 12)
  Draw-Text $g 'Account pulse table' 220 768 330 40 (Font 'Segoe UI' 24 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  for ($i = 0; $i -lt 4; $i++) {
    $y = 840 + $i * 58
    Draw-Line $g 230 $y 1310 $y (Color 164 140 129 50) 2
    Draw-Text $g "Customer $($i + 1)" 240 ($y + 16) 220 28 (Font 'Segoe UI' 18 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
    Draw-Line $g 520 ($y + 28) (740 + $i * 82) ($y + 28) $accent 8
    Draw-Chip $g @('Watch', 'Stable', 'Expand', 'Risk')[$i] 1130 ($y + 10) 130
  }
}

New-Cover 'diamond-edge' {
  param($g)
  $accent = Color 255 182 147
  Draw-Base $g 'Diamond Edge' 'MLB model picks with grounded rationale' 'EDGE' $accent
  Draw-Window $g 120 318 1360 910
  Fill-Round $g 170 430 590 600 22 (Color 255 255 255 12)
  $fieldPen = New-Object System.Drawing.Pen((Color 255 182 147 200), 7)
  $g.DrawPolygon($fieldPen, @(
      (New-Object System.Drawing.PointF(465, 550)),
      (New-Object System.Drawing.PointF(640, 725)),
      (New-Object System.Drawing.PointF(465, 900)),
      (New-Object System.Drawing.PointF(290, 725))
    ))
  $fieldPen.Dispose()
  foreach ($p in @(@(465, 550), @(640, 725), @(465, 900), @(290, 725))) {
    Fill-Round $g ($p[0] - 22) ($p[1] - 22) 44 44 10 (Color 229 226 225 210)
  }
  Draw-Text $g 'Win prob' 240 955 180 38 (Font 'Segoe UI' 24 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  Draw-Line $g 420 978 700 978 $accent 16
  Fill-Round $g 830 430 520 250 22 (Color 179 84 30 42)
  Draw-Text $g 'Recommended pick' 875 468 320 40 (Font 'Segoe UI' 24 ([System.Drawing.FontStyle]::Bold)) (Color 255 182 147)
  Draw-Text $g 'Market edge +6.8%' 875 535 330 52 (Font 'Georgia' 42 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  Draw-Chip $g 'CALIBRATED' 875 610 170
  Draw-Chip $g 'MODEL' 1065 610 130
  Fill-Round $g 830 740 520 290 22 (Color 255 255 255 12)
  Draw-Text $g 'Backtest curve' 875 778 260 38 (Font 'Segoe UI' 24 ([System.Drawing.FontStyle]::Bold)) (Color 229 226 225)
  $prevX = 890
  $prevY = 960
  for ($i = 0; $i -lt 9; $i++) {
    $x = 890 + $i * 48
    $y = 950 - [Math]::Sin($i * .7) * 44 - $i * 7
    Draw-Line $g $prevX $prevY $x $y $accent 5
    $prevX = $x
    $prevY = $y
  }
  Draw-Chip $g 'MLB' 220 1096 100
  Draw-Chip $g 'PYTHON' 342 1096 140
  Draw-Chip $g 'TS' 504 1096 86
}

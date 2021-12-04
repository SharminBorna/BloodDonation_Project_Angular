using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class Profile
    {
        public int ProfileID { get; set; }
        [Column(TypeName = "NVARCHAR(50)")]
        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Column(TypeName = "NVARCHAR(20)")]
        public string Role { get; set; } //(admin, donor, patient)
        [Column(TypeName = "NVARCHAR(50)"), Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Column(TypeName = "NVARCHAR(50)"), Display(Name = "Last Name")]
        public string LastName { get; set; }
        public int Age { get; set; }
        public int Weight { get; set; }
        public string Gender { get; set; }
        //FK
        [ForeignKey("BloodGroup"), Display(Name = "Blood Group")]
        public int BloodGroupID { get; set; }
        [Display(Name = "Contact No")]
        [DataType(DataType.PhoneNumber)]
        public string ContactNo { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        //FK
        [ForeignKey("Location"), Display(Name = "Location")]
        public int LocationID { get; set; }
        [StringLength(200)]
        public string Picture { get; set; }

        //navigation
        public virtual BloodGroup BloodGroup { get; set; }
        public virtual Location Location { get; set; }
        //navigation
        public virtual ICollection<DonateBlood> DonateBloods { get; set; }
        public virtual ICollection<BloodStock> BloodStocks { get; set; }
        [InverseProperty("RequesterProfile")]
        public ICollection<BloodRequest> Requester { get; set; }
        [InverseProperty("DonorProfile")]
        public ICollection<BloodRequest> Donor { get; set; }
    }
}

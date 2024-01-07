using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Contract.RepositoryContracts;
using UdemyProject.Contracts.DTOs.CourseLangugeDTOs;
using UdemyProject.Contracts.ServicesContracts;
using UdemyProject.Domain.Entities;

namespace UdemyProject.Application.ServicesImplementation.Courselangugeimplementation
{
    public class CourseLangugeService : ICourseLangugeService
    {
        private readonly ICourseLangugeRepository _CourseLangugeRepository;

        public CourseLangugeService(ICourseLangugeRepository courseLangugeRepository)
        {
            _CourseLangugeRepository = courseLangugeRepository;
        }

        public async Task<List<CourselangugeDTO>> GetAlllanguge()
        {
            var languges = await _CourseLangugeRepository.GetAllAsNoTracking();
            return languges.Select(c => new CourselangugeDTO()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToList();
        }
    }
}